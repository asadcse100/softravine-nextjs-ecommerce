// pages/api/permissions.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { addPermission } from '@/app/server/controllers/RoleController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await addPermission(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
