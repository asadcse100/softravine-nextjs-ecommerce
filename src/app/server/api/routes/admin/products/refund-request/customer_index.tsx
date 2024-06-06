// pages/api/refund-request/customer_index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { customerIndex } from '@/app/server/controllers/RefundRequestController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            await customerIndex(req, res);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
