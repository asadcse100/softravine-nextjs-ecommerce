import { NextApiRequest, NextApiResponse } from 'next';
import { updateCustomerPackage, deleteCustomerPackage } from '@/app/server/controllers/CustomerPackageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await updateCustomerPackage(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'DELETE') {
    await deleteCustomerPackage(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
