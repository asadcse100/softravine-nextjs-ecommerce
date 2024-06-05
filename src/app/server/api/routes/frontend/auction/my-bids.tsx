
import { NextApiRequest, NextApiResponse } from 'next';
import { getMyBiddedProducts } from '@/app/server/controllers/AuctionProductBidController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getMyBiddedProducts(req, res);
  } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}