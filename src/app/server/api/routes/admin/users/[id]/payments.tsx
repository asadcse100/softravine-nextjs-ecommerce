// pages/api/users/[id]/payments.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { showUserPayments } from '@/app/server/controllers/PaymentController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return showUserPayments(req, res);
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
