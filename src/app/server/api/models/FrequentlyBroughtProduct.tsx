// models/FrequentlyBroughtProduct.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface FrequentlyBroughtProduct {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getFrequentlyBroughtProductById(id: number): Promise<FrequentlyBroughtProduct | null> {
  return await prisma.FrequentlyBroughtProduct.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createFrequentlyBroughtProduct(data: FrequentlyBroughtProduct): Promise<FrequentlyBroughtProduct> {
  return await prisma.FrequentlyBroughtProduct.create({
    data,
  });
}

export async function updateFrequentlyBroughtProduct(id: number, data: Partial<FrequentlyBroughtProduct>): Promise<FrequentlyBroughtProduct | null> {
  return await prisma.FrequentlyBroughtProduct.update({
    where: { id },
    data,
  });
}

export async function deleteFrequentlyBroughtProduct(id: number): Promise<FrequentlyBroughtProduct | null> {
  return await prisma.FrequentlyBroughtProduct.delete({
    where: { id },
  });
}
