// pages/api/pages/store.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { storePage } from '@/app/server/controllers/PageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return storePage(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
