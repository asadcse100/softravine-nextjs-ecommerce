import { NextApiRequest, NextApiResponse } from 'next';
import { recharge, walletPaymentDone } from '@/app/server/controllers/WalletController'; // Import the controller function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await recharge(req, res); // Call the controller function
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.method === 'POST') {
    return walletPaymentDone(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
