// pages/api/sellers.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSellerWithdrawRequests, storeWithdrawRequest } from '@/app/server/controllers/SellerWithdrawRequestController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getSellerWithdrawRequests(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'POST') {
    await storeWithdrawRequest(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
