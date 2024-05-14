// models/Tax.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Tax {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getTaxById(id: number): Promise<Tax | null> {
  return await prisma.Tax.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createTax(data: Tax): Promise<Tax> {
  return await prisma.Tax.create({
    data,
  });
}

export async function updateTax(id: number, data: Partial<Tax>): Promise<Tax | null> {
  return await prisma.Tax.update({
    where: { id },
    data,
  });
}

export async function deleteTax(id: number): Promise<Tax | null> {
  return await prisma.Tax.delete({
    where: { id },
  });
}
