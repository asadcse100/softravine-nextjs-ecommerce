// pages/api/blogs/[slug].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getBlogDetails, getRecentBlogs } from '@/app/server/controllers/BlogController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  try {
    const blog = await getBlogDetails(slug as string);
    const recentBlogs = await getRecentBlogs();
    
    if (blog) {
      res.status(200).json({ blog, recentBlogs });
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
