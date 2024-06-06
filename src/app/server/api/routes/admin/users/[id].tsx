// pages/api/roles/[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { update, destroy } from '@/app/server/controllers/RoleController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  if (req.method === 'PUT') {
    req.query.id = id as string; // Pass the ID as a query parameter
    await update(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'DELETE') {
    await destroy(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
