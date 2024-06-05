// pages/api/categories/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getCategories } from '@/app/server/controllers/CategoryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { search } = req.query;
    const categories = await getCategories(search as string);
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
