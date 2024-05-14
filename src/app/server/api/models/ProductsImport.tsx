// models/ProductsImport.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ProductsImport {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getProductsImportById(id: number): Promise<ProductsImport | null> {
  return await prisma.ProductsImport.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createProductsImport(data: ProductsImport): Promise<ProductsImport> {
  return await prisma.ProductsImport.create({
    data,
  });
}

export async function updateProductsImport(id: number, data: Partial<ProductsImport>): Promise<ProductsImport | null> {
  return await prisma.ProductsImport.update({
    where: { id },
    data,
  });
}

export async function deleteProductsImport(id: number): Promise<ProductsImport | null> {
  return await prisma.ProductsImport.delete({
    where: { id },
  });
}
