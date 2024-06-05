// src/pages/api/policy/supportpolicy.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supportPolicy } from '@/app/server/controllers/HomeController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await supportPolicy(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
