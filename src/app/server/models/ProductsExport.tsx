// models/ProductsExport.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ProductsExport {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getProductsExportById(id: number): Promise<ProductsExport | null> {
  return await prisma.ProductsExport.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createProductsExport(data: ProductsExport): Promise<ProductsExport> {
  return await prisma.ProductsExport.create({
    data,
  });
}

export async function updateProductsExport(id: number, data: Partial<ProductsExport>): Promise<ProductsExport | null> {
  return await prisma.ProductsExport.update({
    where: { id },
    data,
  });
}

export async function deleteProductsExport(id: number): Promise<ProductsExport | null> {
  return await prisma.ProductsExport.delete({
    where: { id },
  });
}
