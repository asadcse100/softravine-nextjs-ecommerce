// models/Coupon.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Coupon {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCouponById(id: number): Promise<Coupon | null> {
  return await prisma.Coupon.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCoupon(data: Coupon): Promise<Coupon> {
  return await prisma.Coupon.create({
    data,
  });
}

export async function updateCoupon(id: number, data: Partial<Coupon>): Promise<Coupon | null> {
  return await prisma.Coupon.update({
    where: { id },
    data,
  });
}

export async function deleteCoupon(id: number): Promise<Coupon | null> {
  return await prisma.Coupon.delete({
    where: { id },
  });
}
