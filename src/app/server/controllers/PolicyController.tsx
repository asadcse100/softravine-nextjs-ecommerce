import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const getPolicyByName = async (req: NextApiRequest, res: NextApiResponse) => {
    const { type } = req.query;

    try {
        const policy = await prisma.policys.findFirst({
            where: { name: String(type) },
        });

        if (policy) {
            res.status(200).json(policy);
        } else {
            res.status(404).json({ message: 'Policy not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
};

export const upsertPolicy = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, content } = req.body;

    try {
        const policy = await prisma.policys.upsert({
            where: { name },
            update: { content },
            create: { name, content },
        });

        res.status(200).json({ message: `${name} updated successfully`, policy });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
};