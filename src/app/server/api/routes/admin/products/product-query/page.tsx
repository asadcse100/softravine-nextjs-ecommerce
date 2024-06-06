
import { NextApiRequest, NextApiResponse } from 'next';
import { getProductQueries, createProductQuery } from '@/app/server/controllers/ProductQueryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const queries = await getProductQueries();
            return res.status(200).json({ success: true, queries });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (req.method === 'POST') {
        await createProductQuery(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
