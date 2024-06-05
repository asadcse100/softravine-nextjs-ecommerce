import { NextApiRequest, NextApiResponse } from 'next';
import { storeAffiliateUser } from '@/app/server/controllers/AffiliateController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await storeAffiliateUser(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
