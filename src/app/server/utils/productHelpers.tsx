// src/utils/productHelpers.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProductWithDetails = async (id: number) => {
  return prisma.product.findUnique({
    where: { id },
    include: {
      stocks: true,
      taxes: true,
      choice_options: true,
    },
  });
};
