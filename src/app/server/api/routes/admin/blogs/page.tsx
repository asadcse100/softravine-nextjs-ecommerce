// pages/api/blogs.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllBlogs, createBlogPost } from '@/app/server/controllers/BlogController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { search = null, selectedCategories = [] } = req.query;

    try {
      const categoriesArray = Array.isArray(selectedCategories) ? selectedCategories : [selectedCategories];
      const blogs = await getAllBlogs(categoriesArray, search ? String(search) : null);
      res.status(200).json({ blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const blog = await createBlogPost(req.body);
      res.status(201).json({ blog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
