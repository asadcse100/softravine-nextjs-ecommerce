// src/pages/api/settings/top-10.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { updateTop10Settings } from '@/app/server/controllers/HomeController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await updateTop10Settings(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
