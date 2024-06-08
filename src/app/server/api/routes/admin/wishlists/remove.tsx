import { NextApiRequest, NextApiResponse } from 'next';
import { remove } from '@/app/server/controllers/WishlistController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return remove(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}