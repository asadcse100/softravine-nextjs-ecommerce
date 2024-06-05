import { NextApiRequest, NextApiResponse } from 'next';
import { index, updateStatus } from '@/app/server/controllers/CountryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await index(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'POST') {
    await updateStatus(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
