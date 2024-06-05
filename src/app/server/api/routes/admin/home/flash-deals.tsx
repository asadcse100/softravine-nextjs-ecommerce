// src/pages/api/flash-deals/all.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllFlashDeals } from '@/app/server/controllers/HomeController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getAllFlashDeals(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
