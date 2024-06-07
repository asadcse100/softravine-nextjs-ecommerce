// pages/api/sellers/bulk-delete.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { deleteSeller } from '../../../controllers/SellerController'; // Import the controller function
import { updateSeller, deleteSeller } from '@/app/server/controllers/SellerController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    await deleteSeller(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
