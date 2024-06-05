// models/ProductStock.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ProductStock {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getProductStockById(id: number): Promise<ProductStock | null> {
  return await prisma.ProductStock.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createProductStock(data: ProductStock): Promise<ProductStock> {
  return await prisma.ProductStock.create({
    data,
  });
}

export async function updateProductStock(id: number, data: Partial<ProductStock>): Promise<ProductStock | null> {
  return await prisma.ProductStock.update({
    where: { id },
    data,
  });
}

export async function deleteProductStock(id: number): Promise<ProductStock | null> {
  return await prisma.ProductStock.delete({
    where: { id },
  });
}
