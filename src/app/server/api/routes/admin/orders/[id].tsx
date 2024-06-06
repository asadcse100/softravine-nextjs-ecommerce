// pages/api/orders/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { showOrder } from '@/app/server/controllers/OrderController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return showOrder(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
