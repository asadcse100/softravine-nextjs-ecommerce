// pages/api/brands.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllBrands, createBrand } from '@/app/server/controllers/BrandController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { search = null } = req.query;

  try {
    const brands = await getAllBrands(search as string);
    res.status(200).json({ brands });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  if (req.method === 'POST') {
    const { name, metaTitle, metaDescription, slug, logo } = req.body;

    try {
      const brand = await createBrand(name, metaTitle, metaDescription, slug, logo);
      res.status(201).json({ brand });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}
