// pages/api/pages/mobile/[slug].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { showMobileCustomPage } from '@/app/server/controllers/PageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  if (req.method === 'GET') {
    return showMobileCustomPage(req, res);
  } else {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
