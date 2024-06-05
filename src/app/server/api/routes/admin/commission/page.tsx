import type { NextApiRequest, NextApiResponse } from 'next';
import { payToSeller } from '@/app/server/controllers/CommissionController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await payToSeller(req.body);
            return res.status(200).json({ success: true, message: 'Payment completed' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    } else {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}