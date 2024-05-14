// models/ProductTranslation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ProductTranslation {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getProductTranslationById(id: number): Promise<ProductTranslation | null> {
  return await prisma.ProductTranslation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createProductTranslation(data: ProductTranslation): Promise<ProductTranslation> {
  return await prisma.ProductTranslation.create({
    data,
  });
}

export async function updateProductTranslation(id: number, data: Partial<ProductTranslation>): Promise<ProductTranslation | null> {
  return await prisma.ProductTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteProductTranslation(id: number): Promise<ProductTranslation | null> {
  return await prisma.ProductTranslation.delete({
    where: { id },
  });
}
