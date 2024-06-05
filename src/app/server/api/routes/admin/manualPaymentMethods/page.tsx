import type { NextApiRequest, NextApiResponse } from 'next';
import { getManualPaymentMethods, storeManualPaymentMethod } from '@/app/server/controllers/ManualPaymentMethodController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getManualPaymentMethods(req, res);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'POST') {
    return storeManualPaymentMethod(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
