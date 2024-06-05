// models/Language.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Language {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getLanguageById(id: number): Promise<Language | null> {
  return await prisma.Language.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createLanguage(data: Language): Promise<Language> {
  return await prisma.Language.create({
    data,
  });
}

export async function updateLanguage(id: number, data: Partial<Language>): Promise<Language | null> {
  return await prisma.Language.update({
    where: { id },
    data,
  });
}

export async function deleteLanguage(id: number): Promise<Language | null> {
  return await prisma.Language.delete({
    where: { id },
  });
}
