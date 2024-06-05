// models/FlashDealProduct.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface FlashDealProduct {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getFlashDealProductById(id: number): Promise<FlashDealProduct | null> {
  return await prisma.FlashDealProduct.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createFlashDealProduct(data: FlashDealProduct): Promise<FlashDealProduct> {
  return await prisma.FlashDealProduct.create({
    data,
  });
}

export async function updateFlashDealProduct(id: number, data: Partial<FlashDealProduct>): Promise<FlashDealProduct | null> {
  return await prisma.FlashDealProduct.update({
    where: { id },
    data,
  });
}

export async function deleteFlashDealProduct(id: number): Promise<FlashDealProduct | null> {
  return await prisma.FlashDealProduct.delete({
    where: { id },
  });
}
