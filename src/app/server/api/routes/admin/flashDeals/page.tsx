// pages/api/flash-deals.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getFlashDeals, createFlashDeal } from '@/app/server/controllers/FlashDealController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { search, page = '1', pageSize = '15' } = req.query;
    if (req.method === 'GET') {
        try {
            const flashDeals = await getFlashDeals(search ? String(search) : undefined);
            res.status(200).json({ flashDeals });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    }
    if (req.method === 'POST') {
        try {
            const flashDeal = await createFlashDeal(req.body);
            res.status(201).json({ message: 'Flash Deal has been inserted successfully', flashDeal });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    }
}
