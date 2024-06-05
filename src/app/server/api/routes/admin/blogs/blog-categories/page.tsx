// pages/api/blog-categories.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlogCategories, createBlogCategory } from '@/app/server/controllers/BlogCategoryController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { search } = req.query;

    try {
      const categories = await getBlogCategories(search ? String(search) : null);
      res.status(200).json({ categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'POST') {
    const { categoryName } = req.body;

    if (!categoryName || typeof categoryName !== 'string' || categoryName.length > 255) {
      return res.status(400).json({ error: 'Category name is required and must be less than 255 characters.' });
    }

    try {
      const category = await createBlogCategory(categoryName);
      res.status(201).json({ category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}
