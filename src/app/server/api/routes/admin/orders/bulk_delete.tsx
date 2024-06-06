// pages/api/orders/bulk_delete.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { bulkDeleteOrders } from '@/app/server/controllers/OrderController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return bulkDeleteOrders(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
