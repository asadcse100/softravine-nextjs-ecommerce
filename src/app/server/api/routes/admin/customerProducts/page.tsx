import { NextApiRequest, NextApiResponse } from 'next';
import { getCustomerProducts, storeCustomerProduct } from '@/app/server/controllers/CustomerProductController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        await getCustomerProducts(req, res);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }

    if (req.method === 'POST') {
        await storeCustomerProduct(req, res);
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
}
