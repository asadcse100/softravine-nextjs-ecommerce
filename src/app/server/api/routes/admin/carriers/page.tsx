// pages/api/carriers.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllCarriers, createCarrier } from '@/app/server/controllers/CarrierController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const carriers = await getAllCarriers();
      res.status(200).json({ carriers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'POST') {
    try {
      const carrier = await createCarrier(req.body);
      res.status(201).json({ carrier });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}
