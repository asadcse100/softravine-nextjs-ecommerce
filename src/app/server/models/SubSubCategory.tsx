// models/SubSubCategory.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SubSubCategory {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSubSubCategoryById(id: number): Promise<SubSubCategory | null> {
  return await prisma.SubSubCategory.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSubSubCategory(data: SubSubCategory): Promise<SubSubCategory> {
  return await prisma.SubSubCategory.create({
    data,
  });
}

export async function updateSubSubCategory(id: number, data: Partial<SubSubCategory>): Promise<SubSubCategory | null> {
  return await prisma.SubSubCategory.update({
    where: { id },
    data,
  });
}

export async function deleteSubSubCategory(id: number): Promise<SubSubCategory | null> {
  return await prisma.SubSubCategory.delete({
    where: { id },
  });
}
