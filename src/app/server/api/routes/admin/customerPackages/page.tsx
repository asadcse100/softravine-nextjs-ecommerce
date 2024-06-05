import { NextApiRequest, NextApiResponse } from 'next';
import { getAllCustomerPackages, createCustomerPackage } from '@/app/server/controllers/CustomerPackageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getAllCustomerPackages(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'POST') {
    await createCustomerPackage(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
