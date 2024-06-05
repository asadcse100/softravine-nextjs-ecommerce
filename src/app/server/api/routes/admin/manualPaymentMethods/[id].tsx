import type { NextApiRequest, NextApiResponse } from 'next';
import { updateManualPaymentMethod, deleteManualPaymentMethod } from '@/app/server/controllers/ManualPaymentMethodController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    return updateManualPaymentMethod(req, res);
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'DELETE') {
    return deleteManualPaymentMethod(req, res);
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
