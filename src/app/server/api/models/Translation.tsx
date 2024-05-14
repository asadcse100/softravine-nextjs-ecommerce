// models/Translation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Translation {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getTranslationById(id: number): Promise<Translation | null> {
  return await prisma.Translation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createTranslation(data: Translation): Promise<Translation> {
  return await prisma.Translation.create({
    data,
  });
}

export async function updateTranslation(id: number, data: Partial<Translation>): Promise<Translation | null> {
  return await prisma.Translation.update({
    where: { id },
    data,
  });
}

export async function deleteTranslation(id: number): Promise<Translation | null> {
  return await prisma.Translation.delete({
    where: { id },
  });
}
