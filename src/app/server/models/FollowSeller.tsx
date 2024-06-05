// models/FollowSeller.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface FollowSeller {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getFollowSellerById(id: number): Promise<FollowSeller | null> {
  return await prisma.FollowSeller.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createFollowSeller(data: FollowSeller): Promise<FollowSeller> {
  return await prisma.FollowSeller.create({
    data,
  });
}

export async function updateFollowSeller(id: number, data: Partial<FollowSeller>): Promise<FollowSeller | null> {
  return await prisma.FollowSeller.update({
    where: { id },
    data,
  });
}

export async function deleteFollowSeller(id: number): Promise<FollowSeller | null> {
  return await prisma.FollowSeller.delete({
    where: { id },
  });
}
