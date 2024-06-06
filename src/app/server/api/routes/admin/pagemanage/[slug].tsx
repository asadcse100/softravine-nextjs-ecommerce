// pages/api/pages/[slug].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { showCustomPage } from '@/app/server/controllers/PageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  if (req.method === 'GET') {
    return showCustomPage(req, res);
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
