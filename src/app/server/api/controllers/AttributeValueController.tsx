// pages/api/attribute-values/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const attributeId = parseInt(req.query.id as string);
  
  if (req.method === 'PUT') {
    try {
      const { name } = req.body;
      const updatedAttributeValue = await prisma.attributeValue.update({
        where: { id: attributeId },
        data: { name }
      });
      
      res.status(200).json(updatedAttributeValue);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
