import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const plugins = await prisma.plugin.findMany({
        orderBy: { name: 'asc' }
      });
      res.status(200).json({ plugins });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { plugin_zip, purchase_code } = req.body;

      // Clear plugin cache
      // Cache::forget('plugin');

      if (fs.existsSync('temp/plugin')) {
        fs.rmdirSync('temp/plugin', { recursive: true });
      }

      // Extract the uploaded zip file
      const zipped_file_name = plugin_zip.name;
      const random_dir = Math.random().toString(36).substring(7);
      const extractedDir = `temp/${random_dir}/plugin`;
      fs.mkdirSync(extractedDir, { recursive: true });
      await plugin_zip.mv(`public/${zipped_file_name}`);

      // Check if the ZipArchive extension is enabled
      if (!fs.existsSync('temp/plugin')) {
        throw new Error('Please enable ZipArchive extension.');
      }

      // Read and parse config.json file
      const configJson = fs.readFileSync(`${extractedDir}/config.json`, 'utf8');
      const json = JSON.parse(configJson);

      // Perform version check
      const currentVersion = await prisma.businessSetting.findFirst({
        where: { type: 'current_version' },
        select: { value: true }
      });
      if (parseFloat(currentVersion.value) < parseFloat(json.minimum_item_version)) {
        throw new Error('This version is not capable of installing plugin, Please update.');
      }

      // Check if plugin already exists
      const existingPlugin = await prisma.plugin.findFirst({
        where: { unique_identifier: json.unique_identifier }
      });

      if (!existingPlugin) {
        const plugin = await prisma.plugin.create({
          data: {
            name: json.name,
            unique_identifier: json.unique_identifier,
            version: json.version,
            activated: true,
            image: json.plugin_banner,
            purchase_code
          }
        });

        // Create new directories
        if (json.directory) {
          for (const directory of json.directory[0].name) {
            fs.mkdirSync(directory, { recursive: true });
          }
        }

        // Create/Replace new files
        if (json.files) {
          for (const file of json.files) {
            fs.copyFileSync(`temp/${random_dir}/${file.root_directory}`, file.update_directory);
          }
        }

        // Run sql modifications
        const sql_path = `temp/${random_dir}/plugin/${json.directory}/sql/update.sql`;
        if (fs.existsSync(sql_path)) {
          const sqlContent = fs.readFileSync(sql_path, 'utf8');
          await prisma.$executeRaw(sqlContent);
        }

        res.status(200).json({ message: 'plugin installed successfully' });
      } else {
        // Update existing plugin
        if (json.unique_identifier === 'delivery_boy' && existingPlugin.version < 3.3) {
          // Remove old files related to the delivery boy
          const dir = 'resources/views/delivery_boys';
          fs.readdirSync(dir).forEach(file => {
            const filePath = `${dir}/${file}`;
            fs.unlinkSync(filePath);
          });
        }

        // Create new directories
        if (json.directory) {
          for (const directory of json.directory[0].name) {
            fs.mkdirSync(directory, { recursive: true });
          }
        }

        // Create/Replace new files
        if (json.files) {
          for (const file of json.files) {
            fs.copyFileSync(`temp/${random_dir}/${file.root_directory}`, file.update_directory);
          }
        }

        for (let i = existingPlugin.version + 0.05; i <= json.version; i += 0.1) {
          // Run sql modifications
          const sql_version = i + 0.05;
          const sqlPath = `temp/${random_dir}/plugin/${json.directory}/sql/${sql_version}.sql`;
          if (fs.existsSync(sqlPath)) {
            const sqlContent = fs.readFileSync(sqlPath, 'utf8');
            await prisma.$executeRaw(sqlContent);
          }
        }

        await prisma.plugin.update({
          where: { unique_identifier: json.unique_identifier },
          data: {
            version: json.version,
            name: json.name,
            image: json.plugin_banner,
            purchase_code
          }
        });

        res.status(200).json({ message: 'This plugin is updated successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
