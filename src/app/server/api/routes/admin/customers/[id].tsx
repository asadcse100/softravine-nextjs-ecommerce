import { NextApiRequest, NextApiResponse } from 'next';
import { deleteCustomer, loginUserById } from '@/app/server/controllers/CustomerController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    await deleteCustomer(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'GET') {
    await loginUserById(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
