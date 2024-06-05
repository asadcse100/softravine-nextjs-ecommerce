import { NextApiRequest, NextApiResponse } from 'next';
import { store } from '@/app/server/controllers/ConversationController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await store(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
