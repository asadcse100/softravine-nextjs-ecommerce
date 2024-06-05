// controllers/followedSellersController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFollowedSellers = async (userId: number) => {
  return await prisma.followedSeller.findMany({
    where: { userId },
    include: { shop: true },
    orderBy: { shopId: 'asc' },
  });
};
