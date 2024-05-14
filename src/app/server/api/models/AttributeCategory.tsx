// models/AttributeCategory.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AttributeCategory {
  id: number;
  // Define other fields here
}

export async function getAttributeCategoryById(id: number): Promise<AttributeCategory | null> {
  return await prisma.attributeCategory.findUnique({
    where: { id },
  });
}

export async function createAttributeCategory(data: AttributeCategory): Promise<AttributeCategory> {
  return await prisma.attributeCategory.create({
    data,
  });
}

export async function updateAttributeCategory(id: number, data: Partial<AttributeCategory>): Promise<AttributeCategory | null> {
  return await prisma.attributeCategory.update({
    where: { id },
    data,
  });
}

export async function deleteAttributeCategory(id: number): Promise<AttributeCategory | null> {
  return await prisma.attributeCategory.delete({
    where: { id },
  });
}
