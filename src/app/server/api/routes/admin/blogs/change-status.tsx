// pages/api/blogs/change-status.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { changeBlogPostStatus } from '@/app/server/controllers/BlogController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, status } = req.body;

    try {
      await changeBlogPostStatus(id, status);
      res.status(200).json({ message: 'Status changed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
