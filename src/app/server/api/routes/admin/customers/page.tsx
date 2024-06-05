import { NextApiRequest, NextApiResponse } from 'next';
import { getCustomerList, createUserAndCustomer } from '@/app/server/controllers/CustomerController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getCustomerList(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'POST') {
    await createUserAndCustomer(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
