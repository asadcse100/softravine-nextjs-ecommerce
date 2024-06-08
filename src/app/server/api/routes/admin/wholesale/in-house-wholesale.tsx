import { NextApiRequest, NextApiResponse } from 'next';
import { getInHouseWholesaleProducts } from '@/app/server/controllers/WholesaleProductController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getInHouseWholesaleProducts(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
