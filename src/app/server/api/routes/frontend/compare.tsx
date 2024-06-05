import { NextApiRequest, NextApiResponse } from 'next';
import { addToCompare, getCategories  } from '@/app/server/controllers/CompareController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await addToCompare(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'GET') {
    await getCategories(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
