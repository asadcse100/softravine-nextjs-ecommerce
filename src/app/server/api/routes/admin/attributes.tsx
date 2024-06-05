// pages/api/attributes.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAttributes, createAttribute, updateAttribute } from '@/app/server/controllers/AttributeController';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const attributes = await getAttributes();
      res.status(200).json({ attributes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { name } = req.body;

    try {
      const attribute = await createAttribute(name);
      res.status(201).json({ attribute });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'PUT') {
    const { name, lang } = req.body;

    try {
      const attribute = await updateAttribute(Number(id), name, lang);
      res.status(200).json({ attribute });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}


