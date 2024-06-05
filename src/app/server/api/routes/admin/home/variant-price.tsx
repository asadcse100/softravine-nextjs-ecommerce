// src/pages/api/product/variant-price.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { variantPrice } from '@/app/server/controllers/HomeController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await variantPrice(req, res);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
