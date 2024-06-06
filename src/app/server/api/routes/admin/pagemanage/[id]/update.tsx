// pages/api/pages/[id]/update.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { updatePage } from '@/app/server/controllers/PageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (req.method === 'POST') {
    return updatePage(req, res);
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
