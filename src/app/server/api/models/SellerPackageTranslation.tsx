// models/SellerPackageTranslation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SellerPackageTranslation {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSellerPackageTranslationById(id: number): Promise<SellerPackageTranslation | null> {
  return await prisma.SellerPackageTranslation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSellerPackageTranslation(data: SellerPackageTranslation): Promise<SellerPackageTranslation> {
  return await prisma.SellerPackageTranslation.create({
    data,
  });
}

export async function updateSellerPackageTranslation(id: number, data: Partial<SellerPackageTranslation>): Promise<SellerPackageTranslation | null> {
  return await prisma.SellerPackageTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteSellerPackageTranslation(id: number): Promise<SellerPackageTranslation | null> {
  return await prisma.SellerPackageTranslation.delete({
    where: { id },
  });
}
