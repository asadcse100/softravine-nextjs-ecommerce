import { NextApiRequest, NextApiResponse } from 'next';
import { getAllWholesaleProducts } from '@/app/server/controllers/WholesaleProductController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getAllWholesaleProducts(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
