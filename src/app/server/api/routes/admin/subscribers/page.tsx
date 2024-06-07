import { NextApiRequest, NextApiResponse } from 'next';
import { getSubscribers, subscribeUser } from '@/app/server/controllers/SubscriberController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getSubscribers(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'POST') {
    return subscribeUser(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}