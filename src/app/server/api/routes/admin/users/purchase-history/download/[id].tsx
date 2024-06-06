// pages/api/users/download/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { downloadProduct } from '@/app/server/controllers/PurchaseHistoryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            await downloadProduct(req, res);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
