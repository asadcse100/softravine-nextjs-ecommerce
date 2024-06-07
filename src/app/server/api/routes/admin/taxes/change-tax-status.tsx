import { NextApiRequest, NextApiResponse } from 'next';
import { changeTaxStatus } from '@/app/server/controllers/TaxController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await changeTaxStatus(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }

}