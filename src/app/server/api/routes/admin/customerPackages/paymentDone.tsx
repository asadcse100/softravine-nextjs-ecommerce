import { NextApiRequest, NextApiResponse } from 'next';
import { purchasePaymentDone } from '@/app/server/controllers/CustomerPackageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await purchasePaymentDone(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
