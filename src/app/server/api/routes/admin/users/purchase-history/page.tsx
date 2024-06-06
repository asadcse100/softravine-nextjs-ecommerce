// pages/api/users/purchase-history/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getPurchaseHistory } from '@/app/server/controllers/PurchaseHistoryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const userId = Number(req.headers.userid); // Assuming you're passing user ID in headers
            const orders = await getPurchaseHistory(userId);
            return res.status(200).json({ success: true, orders });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
