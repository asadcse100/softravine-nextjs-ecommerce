// src/pages/api/policy/returnpolicy.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { returnPolicy } from '@/app/server/controllers/HomeController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await returnPolicy(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
