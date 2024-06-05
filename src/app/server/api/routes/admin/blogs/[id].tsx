// pages/api/blogs/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateBlogPost, deleteBlogPost } from '@/app/server/controllers/BlogController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const blog = await updateBlogPost(Number(id), req.body);
      res.status(200).json({ blog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'DELETE') {
    try {
      await deleteBlogPost(Number(id));
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}
