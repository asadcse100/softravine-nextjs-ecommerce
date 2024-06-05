import { NextApiRequest, NextApiResponse } from 'next';
import { affiliateOptionStore } from '@/app/server/controllers/AffiliateController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await affiliateOptionStore(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
