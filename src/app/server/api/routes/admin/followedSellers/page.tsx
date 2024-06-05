import { NextApiRequest, NextApiResponse } from 'next';
import { getFollowedSellers, followSellerController } from '@/app/server/controllers/FollowSellerController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getFollowedSellers(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'POST') {
    await followSellerController.store(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
