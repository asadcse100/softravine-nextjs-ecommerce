// pages/api/orders/assign_delivery_boy.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { assignDeliveryBoy } from '@/app/server/controllers/OrderController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return assignDeliveryBoy(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
