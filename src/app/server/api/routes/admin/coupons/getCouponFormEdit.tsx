import { NextApiRequest, NextApiResponse } from 'next';
import { getCouponFormEdit } from '@/app/server/controllers/CouponController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await getCouponFormEdit(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
