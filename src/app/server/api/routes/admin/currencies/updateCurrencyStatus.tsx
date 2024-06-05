import { NextApiRequest, NextApiResponse } from 'next';
import { updateCurrencyStatus } from '@/app/server/controllers/CurrencyController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await updateCurrencyStatus(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
