// pages/api/brands/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateBrand, deleteBrand } from '@/app/server/controllers/BrandController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { name, metaTitle, metaDescription, slug, logo, lang } = req.body;

    try {
      const brand = await updateBrand(Number(id), name, metaTitle, metaDescription, slug, logo, lang);
      res.status(200).json({ brand });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'DELETE') {
    try {
      await deleteBrand(Number(id));
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
