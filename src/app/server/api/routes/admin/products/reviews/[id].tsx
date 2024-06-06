// pages/api/reviews.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { updatePublished } from '@/app/server/controllers/ReviewController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await updatePublished(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
