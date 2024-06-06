// pages/api/refund_request/request_approval_vendor.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { requestApprovalVendor } from '@/app/server/controllers/RefundRequestController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await requestApprovalVendor(req, res);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
