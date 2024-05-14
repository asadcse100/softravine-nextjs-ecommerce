// models/AffiliateLog.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AffiliateLog {
  id: number;
  userId: number;
  orderDetailId: number;
  orderId: number;
  // Define other fields here
}

export async function getAffiliateLogById(id: number): Promise<AffiliateLog | null> {
  return await prisma.affiliateLog.findUnique({
    where: { id },
    include: {
      user: true,
      order_detail: true,
      order: true,
    },
  });
}

export async function createAffiliateLog(data: AffiliateLog): Promise<AffiliateLog> {
  return await prisma.affiliateLog.create({
    data,
  });
}

export async function updateAffiliateLog(id: number, data: Partial<AffiliateLog>): Promise<AffiliateLog | null> {
  return await prisma.affiliateLog.update({
    where: { id },
    data,
    include: {
      user: true,
      order_detail: true,
      order: true,
    },
  });
}

export async function deleteAffiliateLog(id: number): Promise<AffiliateLog | null> {
  return await prisma.affiliateLog.delete({
    where: { id },
  });
}
