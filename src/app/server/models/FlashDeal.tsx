// models/FlashDeal.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface FlashDeal {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getFlashDealById(id: number): Promise<FlashDeal | null> {
  return await prisma.FlashDeal.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createFlashDeal(data: FlashDeal): Promise<FlashDeal> {
  return await prisma.FlashDeal.create({
    data,
  });
}

export async function updateFlashDeal(id: number, data: Partial<FlashDeal>): Promise<FlashDeal | null> {
  return await prisma.FlashDeal.update({
    where: { id },
    data,
  });
}

export async function deleteFlashDeal(id: number): Promise<FlashDeal | null> {
  return await prisma.FlashDeal.delete({
    where: { id },
  });
}
