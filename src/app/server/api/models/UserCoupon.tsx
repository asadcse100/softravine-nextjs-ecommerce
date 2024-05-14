// models/UserCoupon.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface UserCoupon {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getUserCouponById(id: number): Promise<UserCoupon | null> {
  return await prisma.UserCoupon.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createUserCoupon(data: UserCoupon): Promise<UserCoupon> {
  return await prisma.UserCoupon.create({
    data,
  });
}

export async function updateUserCoupon(id: number, data: Partial<UserCoupon>): Promise<UserCoupon | null> {
  return await prisma.UserCoupon.update({
    where: { id },
    data,
  });
}

export async function deleteUserCoupon(id: number): Promise<UserCoupon | null> {
  return await prisma.UserCoupon.delete({
    where: { id },
  });
}
