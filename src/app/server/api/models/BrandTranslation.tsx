// models/BrandTranslation.ts
import { PrismaClient, Brand } from '@prisma/client';

const prisma = new PrismaClient();

export interface BrandTranslation {
  id: number;
  name: string;
  lang: string;
  brandId: number;
}

export async function createBrandTranslation(data: BrandTranslation): Promise<BrandTranslation> {
  return await prisma.brandTranslation.create({
    data,
  });
}

export async function updateBrandTranslation(id: number, data: Partial<BrandTranslation>): Promise<BrandTranslation | null> {
  return await prisma.brandTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteBrandTranslation(id: number): Promise<BrandTranslation | null> {
  return await prisma.brandTranslation.delete({
    where: { id },
  });
}
