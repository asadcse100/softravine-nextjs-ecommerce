// pages/api/carriers/status.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateCarrierStatus } from '@/app/server/controllers/CarrierController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { id, status } = req.body;
      const updatedCarrier = await updateCarrierStatus(id, status);
      res.status(200).json({ carrier: updatedCarrier });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
