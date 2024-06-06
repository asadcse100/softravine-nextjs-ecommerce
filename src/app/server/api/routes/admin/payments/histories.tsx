// pages/api/payments/histories.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getPaymentHistories } from '@/app/server/controllers/PaymentController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getPaymentHistories(req, res);
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
