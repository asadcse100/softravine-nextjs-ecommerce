import { NextApiRequest, NextApiResponse } from 'next';
import { destroy } from '@/app/server/controllers/ConversationController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    await destroy(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
