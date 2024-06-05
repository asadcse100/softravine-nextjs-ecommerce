import { NextApiRequest, NextApiResponse } from 'next';
import { getOfflinePaymentRequests } from '@/app/server/controllers/CustomerPackagePaymentController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getOfflinePaymentRequests(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
