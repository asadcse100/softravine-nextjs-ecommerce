import { NextApiRequest, NextApiResponse } from 'next';
import { createAuctionProduct, getAllAuctionProducts } from '@/app/server/controllers/AuctionProductController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await createAuctionProduct(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'GET') {
    return getAllAuctionProducts(req, res);
  } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}