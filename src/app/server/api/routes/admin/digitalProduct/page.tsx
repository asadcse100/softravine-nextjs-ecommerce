// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getDigitalProducts, storeProduct } from '@/app/server/controllers/DigitalProductController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { search } = req.query;
    if (req.method === 'GET') {
        try {
            const products = await getDigitalProducts(search ? String(search) : undefined);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    if (req.method === 'POST') {
        try {
          const product = await storeProduct(req.body);
          res.status(201).json({ message: 'Product has been inserted successfully', product });
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
      } else {
        res.status(405).json({ message: 'Method Not Allowed' });
      }
}
