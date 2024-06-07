import { NextApiRequest, NextApiResponse } from 'next';
import { getStates, createState } from '@/app/server/controllers/StateController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getStates(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'POST') {
    return createState(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}