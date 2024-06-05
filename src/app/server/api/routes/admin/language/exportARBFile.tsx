import type { NextApiRequest, NextApiResponse } from 'next';
import { exportARBFile } from '@/app/server/controllers/LanguageController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return exportARBFile(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
