import { NextApiRequest, NextApiResponse } from 'next';
import { purchasePackage } from '@/app/server/controllers/CustomerPackageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await purchasePackage(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
