import { NextApiRequest, NextApiResponse } from 'next';
import { approveOfflinePayment } from '@/app/server/controllers/CustomerPackagePaymentController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await approveOfflinePayment(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
