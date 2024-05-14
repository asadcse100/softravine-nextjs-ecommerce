// models/PageTranslation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface PageTranslation {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getPageTranslationById(id: number): Promise<PageTranslation | null> {
  return await prisma.PageTranslation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createPageTranslation(data: PageTranslation): Promise<PageTranslation> {
  return await prisma.PageTranslation.create({
    data,
  });
}

export async function updatePageTranslation(id: number, data: Partial<PageTranslation>): Promise<PageTranslation | null> {
  return await prisma.PageTranslation.update({
    where: { id },
    data,
  });
}

export async function deletePageTranslation(id: number): Promise<PageTranslation | null> {
  return await prisma.PageTranslation.delete({
    where: { id },
  });
}
