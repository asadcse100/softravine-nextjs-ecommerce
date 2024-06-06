
// pages/api/orders/store.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { storeOrder } from '@/app/server/controllers/OrderController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return storeOrder(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
