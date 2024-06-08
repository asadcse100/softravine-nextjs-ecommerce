import { NextApiRequest, NextApiResponse } from 'next';
import { offlineRecharge } from '@/app/server/controllers/WalletController'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return offlineRecharge(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
