// src/pages/api/pickup/points.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getPickUpPoints } from '@/app/server/controllers/HomeController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getPickUpPoints(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
