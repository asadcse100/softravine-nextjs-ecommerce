import { NextApiRequest, NextApiResponse } from 'next';
import { getAuctionOrderDetails } from '@/app/server/controllers/AuctionProductController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    if (req.method === 'GET') {
      return getAuctionOrderDetails(req, res);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }