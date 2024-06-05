// models/Seller.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Seller {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSellerById(id: number): Promise<Seller | null> {
  return await prisma.Seller.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSeller(data: Seller): Promise<Seller> {
  return await prisma.Seller.create({
    data,
  });
}

export async function updateSeller(id: number, data: Partial<Seller>): Promise<Seller | null> {
  return await prisma.Seller.update({
    where: { id },
    data,
  });
}

export async function deleteSeller(id: number): Promise<Seller | null> {
  return await prisma.Seller.delete({
    where: { id },
  });
}
