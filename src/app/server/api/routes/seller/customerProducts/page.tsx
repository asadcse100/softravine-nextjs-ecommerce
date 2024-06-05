import { NextApiRequest, NextApiResponse } from 'next';
import { getUserProducts } from '@/app/server/controllers/CustomerProductController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getUserProducts(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
