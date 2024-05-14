// models/PickupPointTranslation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface PickupPointTranslation {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getPickupPointTranslationById(id: number): Promise<PickupPointTranslation | null> {
  return await prisma.PickupPointTranslation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createPickupPointTranslation(data: PickupPointTranslation): Promise<PickupPointTranslation> {
  return await prisma.PickupPointTranslation.create({
    data,
  });
}

export async function updatePickupPointTranslation(id: number, data: Partial<PickupPointTranslation>): Promise<PickupPointTranslation | null> {
  return await prisma.PickupPointTranslation.update({
    where: { id },
    data,
  });
}

export async function deletePickupPointTranslation(id: number): Promise<PickupPointTranslation | null> {
  return await prisma.PickupPointTranslation.delete({
    where: { id },
  });
}
