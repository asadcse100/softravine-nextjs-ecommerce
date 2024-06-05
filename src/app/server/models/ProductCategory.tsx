// models/ProductCategory.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ProductCategory {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getProductCategoryById(id: number): Promise<ProductCategory | null> {
  return await prisma.ProductCategory.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createProductCategory(data: ProductCategory): Promise<ProductCategory> {
  return await prisma.ProductCategory.create({
    data,
  });
}

export async function updateProductCategory(id: number, data: Partial<ProductCategory>): Promise<ProductCategory | null> {
  return await prisma.ProductCategory.update({
    where: { id },
    data,
  });
}

export async function deleteProductCategory(id: number): Promise<ProductCategory | null> {
  return await prisma.ProductCategory.delete({
    where: { id },
  });
}
