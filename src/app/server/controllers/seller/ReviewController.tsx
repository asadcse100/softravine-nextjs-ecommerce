import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { Review, Product } from '@prisma/client';

export default async function ReviewController(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return handleGet(req, res);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        const reviews = await prisma.review.findMany({
            orderBy: { id: 'desc' },
            distinct: ['id'],
            where: {
                product: { user_id: Number(req.query.id) }
            },
            include: { product: true }
        });

        for (const review of reviews) {
            await prisma.review.update({
                where: { id: review.id },
                data: { viewed: true }
            });
        }

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
