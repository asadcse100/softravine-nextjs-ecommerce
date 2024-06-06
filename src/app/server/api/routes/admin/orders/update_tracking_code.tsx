// pages/api/orders/update_tracking_code.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { updateTrackingCode } from '@/app/server/controllers/OrderController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return updateTrackingCode(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
