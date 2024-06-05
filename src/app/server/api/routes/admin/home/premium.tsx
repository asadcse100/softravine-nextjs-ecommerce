// src/pages/api/packages/premium.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getPremiumPackages } from '@/app/server/controllers/HomeController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getPremiumPackages(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
