import { NextApiRequest, NextApiResponse } from 'next';
import { getOfflineRechargeRequests, updateApproved } from '@/app/server/controllers/WalletController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await getOfflineRechargeRequests(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'POST') {
    return updateApproved(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}