// models/WholesalePrice.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface WholesalePrice {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getWholesalePriceById(id: number): Promise<WholesalePrice | null> {
  return await prisma.WholesalePrice.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createWholesalePrice(data: WholesalePrice): Promise<WholesalePrice> {
  return await prisma.WholesalePrice.create({
    data,
  });
}

export async function updateWholesalePrice(id: number, data: Partial<WholesalePrice>): Promise<WholesalePrice | null> {
  return await prisma.WholesalePrice.update({
    where: { id },
    data,
  });
}

export async function deleteWholesalePrice(id: number): Promise<WholesalePrice | null> {
  return await prisma.WholesalePrice.delete({
    where: { id },
  });
}
