import { NextApiRequest, NextApiResponse } from 'next';
import { updateStateStatus } from '@/app/server/controllers/StateController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await updateStateStatus(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}