// models/CouponUsage.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CouponUsage {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCouponUsageById(id: number): Promise<CouponUsage | null> {
  return await prisma.CouponUsage.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCouponUsage(data: CouponUsage): Promise<CouponUsage> {
  return await prisma.CouponUsage.create({
    data,
  });
}

export async function updateCouponUsage(id: number, data: Partial<CouponUsage>): Promise<CouponUsage | null> {
  return await prisma.CouponUsage.update({
    where: { id },
    data,
  });
}

export async function deleteCouponUsage(id: number): Promise<CouponUsage | null> {
  return await prisma.CouponUsage.delete({
    where: { id },
  });
}
