import { NextApiRequest, NextApiResponse } from 'next';
import { createSeller, storeSeller } from '@/app/server/controllers/ShopController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await createSeller(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'POST') {
    return storeSeller(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}