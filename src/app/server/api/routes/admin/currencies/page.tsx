import { NextApiRequest, NextApiResponse } from 'next';
import { getCurrencyList, createCurrency } from '@/app/server/controllers/CurrencyController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getCurrencyList(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'POST') {
    await createCurrency(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
