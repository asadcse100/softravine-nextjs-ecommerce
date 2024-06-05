// models/ProductTax.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ProductTax {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getProductTaxById(id: number): Promise<ProductTax | null> {
  return await prisma.ProductTax.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createProductTax(data: ProductTax): Promise<ProductTax> {
  return await prisma.ProductTax.create({
    data,
  });
}

export async function updateProductTax(id: number, data: Partial<ProductTax>): Promise<ProductTax | null> {
  return await prisma.ProductTax.update({
    where: { id },
    data,
  });
}

export async function deleteProductTax(id: number): Promise<ProductTax | null> {
  return await prisma.ProductTax.delete({
    where: { id },
  });
}
