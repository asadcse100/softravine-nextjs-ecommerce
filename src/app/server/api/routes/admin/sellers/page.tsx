// pages/api/sellers.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSellers, createSeller } from '@/app/server/controllers/SellerController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getSellers(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'POST') {
    await createSeller(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
