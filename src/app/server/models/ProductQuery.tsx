// models/ProductQuery.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ProductQuery {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getProductQueryById(id: number): Promise<ProductQuery | null> {
  return await prisma.ProductQuery.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createProductQuery(data: ProductQuery): Promise<ProductQuery> {
  return await prisma.ProductQuery.create({
    data,
  });
}

export async function updateProductQuery(id: number, data: Partial<ProductQuery>): Promise<ProductQuery | null> {
  return await prisma.ProductQuery.update({
    where: { id },
    data,
  });
}

export async function deleteProductQuery(id: number): Promise<ProductQuery | null> {
  return await prisma.ProductQuery.delete({
    where: { id },
  });
}
