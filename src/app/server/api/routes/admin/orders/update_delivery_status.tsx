// pages/api/orders/update_delivery_status.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { updateDeliveryStatus } from '@/app/server/controllers/OrderController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return updateDeliveryStatus(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
