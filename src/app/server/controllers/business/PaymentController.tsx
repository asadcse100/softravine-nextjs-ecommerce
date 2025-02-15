import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const payments = await prisma.payments.findMany({
        where: { seller_id: parseInt(req.query.userId as string) },
        take: 9
      });
      return { success: true, data: payments };
      // res.status(200).json({ payments });
    } catch (error) {
      return { success: false, error };
      // console.error(error);
      // res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // res.status(405).json({ error: 'Method Not Allowed' });
    return { success: false };
  }
}
