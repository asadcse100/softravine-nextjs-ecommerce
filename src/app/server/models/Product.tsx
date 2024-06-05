// models/Product.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Product {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getProductById(id: number): Promise<Product | null> {
  return await prisma.Product.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createProduct(data: Product): Promise<Product> {
  return await prisma.Product.create({
    data,
  });
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<Product | null> {
  return await prisma.Product.update({
    where: { id },
    data,
  });
}

export async function deleteProduct(id: number): Promise<Product | null> {
  return await prisma.Product.delete({
    where: { id },
  });
}
