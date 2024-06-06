// pages/api/users/purchase-history-details/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getOrderDetails } from '@/app/server/controllers/PurchaseHistoryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const orderId = Number(req.query.id); // Assuming you're passing order ID as a query parameter
            const order = await getOrderDetails(orderId);
            return res.status(200).json({ success: true, order });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
