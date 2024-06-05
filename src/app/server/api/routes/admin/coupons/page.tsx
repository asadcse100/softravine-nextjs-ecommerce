import { NextApiRequest, NextApiResponse } from 'next';
import { index, store } from '@/app/server/controllers/CouponController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await index(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'POST') {
    await store(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
