// controllers/ProductQueryController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductQueries = async () => {
    try {
        const admin = await prisma.users.findFirst({
            where: {
                user_type: 'admin'
            },
            select: {
                id: true
            }
        });

        const queries = await prisma.product_queries.findMany({
            where: {
                seller_id: admin?.id
            },
            orderBy: {
                created_at: 'desc'
            },
            take: 20
        });

        return queries;
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching product queries');
    }
};

export const createProductQuery = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { question, productId } = req.body;
        const product = await prisma.product.findUnique({
            where: { id: Number(productId) },
            select: { user_id: true } // Fetch seller ID
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const query = await prisma.productQuery.create({
            data: {
                customer_id: Number(req.headers.userid), // Assuming you're passing user ID in headers
                seller_id: product.user_id,
                product_id: Number(productId),
                question: question
            }
        });

        return res.status(201).json({ success: true, query });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export const replyToQuery = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { reply } = req.body;
        const queryId = Number(req.query.id);

        const query = await prisma.productQuery.update({
            where: { id: queryId },
            data: { reply: reply }
        });

        return res.status(200).json({ success: true, query });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};