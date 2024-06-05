// models/SellerPackage.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SellerPackage {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSellerPackageById(id: number): Promise<SellerPackage | null> {
  return await prisma.SellerPackage.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSellerPackage(data: SellerPackage): Promise<SellerPackage> {
  return await prisma.SellerPackage.create({
    data,
  });
}

export async function updateSellerPackage(id: number, data: Partial<SellerPackage>): Promise<SellerPackage | null> {
  return await prisma.SellerPackage.update({
    where: { id },
    data,
  });
}

export async function deleteSellerPackage(id: number): Promise<SellerPackage | null> {
  return await prisma.SellerPackage.delete({
    where: { id },
  });
}
