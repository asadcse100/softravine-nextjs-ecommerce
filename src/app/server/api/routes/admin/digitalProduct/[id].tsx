// pages/api/products/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { updateProduct, deleteProduct } from '@/app/server/controllers/DigitalProductController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const product = await updateProduct(Number(id), req.body);
      res.status(200).json({ message: 'Product has been updated successfully', product });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }

  if (req.method === 'DELETE') {
    try {
      await deleteProduct(Number(id));
      res.status(200).json({ message: 'Product has been deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
