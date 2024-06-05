import { NextApiRequest, NextApiResponse } from 'next';
import { toggleUserBanStatus } from '@/app/server/controllers/CustomerController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await toggleUserBanStatus(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
