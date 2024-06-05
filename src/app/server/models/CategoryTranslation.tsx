// models/CategoryTranslation.ts
import { PrismaClient, CategoryTranslation as CategoryTranslationModel } from '@prisma/client';

const prisma = new PrismaClient();

export interface CategoryTranslation {
  id: number;
  name: string;
  lang: string;
  category_id: number;
}

export async function createCategoryTranslation(data: CategoryTranslation): Promise<CategoryTranslation> {
  return await prisma.categoryTranslation.create({
    data,
  });
}

export async function updateCategoryTranslation(id: number, data: Partial<CategoryTranslation>): Promise<CategoryTranslation | null> {
  return await prisma.categoryTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteCategoryTranslation(id: number): Promise<CategoryTranslation | null> {
  return await prisma.categoryTranslation.delete({
    where: { id },
  });
}
