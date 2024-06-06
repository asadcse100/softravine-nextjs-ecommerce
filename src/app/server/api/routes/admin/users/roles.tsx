// pages/api/staffRoles.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { index, store } from '@/app/server/controllers/RoleController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await index(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'POST') {
    await store(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
