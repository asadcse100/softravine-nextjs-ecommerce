import { PrismaClient } from '@prisma/client';
import { createReadStream, mkdirSync, existsSync, unlinkSync } from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { join } from 'path';
import { parse } from 'json5';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    name: string;
    unique_identifier: string;
    version: string;
    activated: number;
    image: string;
    purchase_code: string;
    created_at?: string;
};

export default async function handler() {
    if (req.method === 'POST') {
        const {
            DEMO_MODE,
            Plugin_zip,
            purchase_code,
        } = req.body;

        if (DEMO_MODE === 'On') {
            return res.status(400).json({ message: 'This action is disabled in demo mode' });
        }

        try {
            const plugin = await prisma.plugin.create({
                data: {
                    name: 'Plugin Name', // set default name if not provided
                    unique_identifier: 'unique_identifier', // set default unique identifier if not provided
                    version: '1.0.0', // set default version if not provided
                    activated: true, // set default activated status if not provided
                    purchase_code: purchase_code,
                    // set other fields here
                }
            });

            // Handle Plugin Zip
            if (Plugin_zip) {
                const zipPath = Plugin_zip.path;
                const randomDir = Math.random().toString(36).substring(7);
                const extractDir = join(process.cwd(), 'temp', randomDir, 'plugin');
                const zipReadStream = createReadStream(zipPath);
                const { extract } = require('extract-zip');
                await extract(zipPath, { dir: extractDir });

                const configFilePath = join(extractDir, 'config.json');
                const configContent = await promisify(fs.readFile)(configFilePath, 'utf8');
                const config = parse(configContent);

                // Check version compatibility
                if (config.minimum_item_version <= 1.0) { // Assuming the current version is 1.0
                    const existingPlugin = await prisma.plugins.findFirst({
                        where: { unique_identifier: config.unique_identifier },
                    });

                    if (!existingPlugin) {
                        // Plugin installation
                        await prisma.plugins.create({
                            data: {
                                name: config.name,
                                unique_identifier: config.unique_identifier,
                                version: config.version,
                                activated: true,
                                // set other fields here
                            }
                        });

                        // Handle directories and files
                        // ...
                        return { success: true };
                        // res.status(200).json({ message: 'Plugin installed successfully' });
                    } else {
                        // Plugin update
                        await prisma.plugins.update({
                            where: { id: existingPlugin.id },
                            data: {
                                version: config.version,
                                name: config.name,
                                // update other fields here
                            },
                        });

                        // Handle directories and files
                        // ...
                        return { success: true };
                        // res.status(200).json({ message: 'This Plugin is updated successfully' });
                    }
                } else {
                    return { success: false, error };
                    // res.status(400).json({ message: 'This version is not capable of installing plugin, Please update.' });
                }

                // Clean up
                unlinkSync(zipPath);
                await prisma.$executeRaw`DROP TABLE temp.${randomDir}`;
            }
        } catch (error) {
            return { success: false, error };
            // console.error(error);
            // res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return { success: false, error };
        // res.status(405).end(); // Method Not Allowed
    }
}
