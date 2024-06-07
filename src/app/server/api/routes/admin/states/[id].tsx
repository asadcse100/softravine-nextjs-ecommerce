import { NextApiRequest, NextApiResponse } from 'next';
import { updateState, deleteState } from '@/app/server/controllers/StateController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await updateState(req, res); // Call the controller function
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'DELETE') {
    await deleteState(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
