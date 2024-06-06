// pages/api/stock-report.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getStockReport } from '@/app/server/controllers/ReportController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        try {
            await getStockReport(req, res);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }

}
