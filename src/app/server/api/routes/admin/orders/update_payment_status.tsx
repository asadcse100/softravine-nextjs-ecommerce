// pages/api/orders/update_payment_status.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { updatePaymentStatus } from '@/app/server/controllers/OrderController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return updatePaymentStatus(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
