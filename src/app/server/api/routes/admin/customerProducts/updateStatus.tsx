import type { NextApiRequest, NextApiResponse } from 'next';
import { updateStatus } from '@/app/server/controllers/CustomerProductController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await updateStatus(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
