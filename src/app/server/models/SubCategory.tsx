// models/SubCategory.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SubCategory {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSubCategoryById(id: number): Promise<SubCategory | null> {
  return await prisma.SubCategory.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSubCategory(data: SubCategory): Promise<SubCategory> {
  return await prisma.Country.create({
    data,
  });
}

export async function updateCountry(id: number, data: Partial<Country>): Promise<SubCategory | null> {
  return await prisma.SubCategory.update({
    where: { id },
    data,
  });
}

export async function deleteSubCategory(id: number): Promise<SubCategory | null> {
  return await prisma.SubCategory.delete({
    where: { id },
  });
}
