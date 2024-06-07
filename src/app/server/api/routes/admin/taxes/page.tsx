import { NextApiRequest, NextApiResponse } from 'next';
import { index, store } from '@/app/server/controllers/TaxController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await index(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'POST') {
    return store(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}