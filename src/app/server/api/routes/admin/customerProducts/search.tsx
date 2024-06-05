import type { NextApiRequest, NextApiResponse } from 'next';
import { search } from '@/app/server/controllers/CustomerProductController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await search(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
