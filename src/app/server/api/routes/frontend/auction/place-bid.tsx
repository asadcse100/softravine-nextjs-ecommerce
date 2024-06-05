import { NextApiRequest, NextApiResponse } from 'next';
import { placeBid } from '@/app/server/controllers/AuctionProductBidController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return placeBid(req, res);
  } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}