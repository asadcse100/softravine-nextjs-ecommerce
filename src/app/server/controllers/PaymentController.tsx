// controllers/userController.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Utility function to decrypt the ID
function decrypt(text: string): string {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.SECRET_KEY);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export async function getPaymentHistories(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { page = 1, pageSize = 15 } = req.query;
      const pageNum = parseInt(page as string, 10);
      const pageSizeNum = parseInt(pageSize as string, 10);
  
      const payments = await prisma.payment.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (pageNum - 1) * pageSizeNum,
        take: pageSizeNum,
      });
  
      const totalPayments = await prisma.payment.count();
  
      return res.status(200).json({ payments, totalPayments, page: pageNum, pageSize: pageSizeNum });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

export async function showUserPayments(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const decryptedId = decrypt(id as string);

    // Find the user by decrypted ID
    const user = await prisma.user.findUnique({
      where: { id: Number(decryptedId) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the payment history for the user
    const payments = await prisma.payment.findMany({
      where: { sellerId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    if (payments.length > 0) {
      return res.status(200).json({ payments, user });
    } else {
      return res.status(200).json({ message: 'No payment history available for this seller' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
