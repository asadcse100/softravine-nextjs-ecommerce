// models/AppTranslation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AppTranslation {
  id: number;
  // Define other fields here
}

export async function getAppTranslationById(id: number): Promise<AppTranslation | null> {
  return await prisma.appTranslation.findUnique({
    where: { id },
  });
}

export async function createAppTranslation(data: AppTranslation): Promise<AppTranslation> {
  return await prisma.appTranslation.create({
    data,
  });
}

export async function updateAppTranslation(id: number, data: Partial<AppTranslation>): Promise<AppTranslation | null> {
  return await prisma.appTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteAppTranslation(id: number): Promise<AppTranslation | null> {
  return await prisma.appTranslation.delete({
    where: { id },
  });
}
