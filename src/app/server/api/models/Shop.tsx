// models/Shop.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Shop {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getShopById(id: number): Promise<Shop | null> {
  return await prisma.Shop.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createShop(data: Shop): Promise<Shop> {
  return await prisma.Shop.create({
    data,
  });
}

export async function updateShop(id: number, data: Partial<Shop>): Promise<Shop | null> {
  return await prisma.Shop.update({
    where: { id },
    data,
  });
}

export async function deleteShop(id: number): Promise<Shop | null> {
  return await prisma.Shop.delete({
    where: { id },
  });
}
