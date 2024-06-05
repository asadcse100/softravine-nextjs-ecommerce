// models/FlashDealTranslation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface FlashDealTranslation {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getFlashDealTranslationById(id: number): Promise<FlashDealTranslation | null> {
  return await prisma.FlashDealTranslation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createFlashDealTranslation(data: FlashDealTranslation): Promise<FlashDealTranslation> {
  return await prisma.FlashDealTranslation.create({
    data,
  });
}

export async function updateFlashDealTranslation(id: number, data: Partial<FlashDealTranslation>): Promise<FlashDealTranslation | null> {
  return await prisma.FlashDealTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteFlashDealTranslation(id: number): Promise<FlashDealTranslation | null> {
  return await prisma.FlashDealTranslation.delete({
    where: { id },
  });
}
