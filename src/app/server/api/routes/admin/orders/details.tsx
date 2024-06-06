// pages/api/orders/details.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getOrderDetails } from '@/app/server/controllers/OrderController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getOrderDetails(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
