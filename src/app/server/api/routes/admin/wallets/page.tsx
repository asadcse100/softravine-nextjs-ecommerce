import { NextApiRequest, NextApiResponse } from 'next';
import { index } from '@/app/server/controllers/WalletController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await index(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}