// pages/api/users/digital-purchase-history/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getDigitalPurchaseHistory } from '@/app/server/controllers/PurchaseHistoryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const userId = Number(req.headers.userid); // Assuming you're passing user ID in headers
            const page = Number(req.query.page) || 1;
            const orders = await getDigitalPurchaseHistory(userId, page);
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
