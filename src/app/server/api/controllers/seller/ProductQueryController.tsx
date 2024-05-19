import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { ProductQuery } from '@prisma/client';

export default async function ProductQueryController(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return handleGet(req, res);
    } else if (req.method === 'POST') {
        return handlePost(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const queries = await prisma.productQuery.findMany({
            where: { seller_id: Number(req.query.id) },
            orderBy: { created_at: 'desc' },
            take: 20
        });
        res.status(200).json(queries);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const { reply } = req.body;

    try {
        const query = await prisma.productQuery.update({
            where: { id: Number(id) },
            data: { reply }
        });
        res.status(200).json({ message: 'Replied successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
