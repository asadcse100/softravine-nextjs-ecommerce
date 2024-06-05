// models/SellerPackagePayment.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SellerPackagePayment {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSellerPackagePaymentById(id: number): Promise<SellerPackagePayment | null> {
  return await prisma.SellerPackagePayment.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSellerPackagePayment(data: SellerPackagePayment): Promise<SellerPackagePayment> {
  return await prisma.SellerPackagePayment.create({
    data,
  });
}

export async function updateSellerPackagePayment(id: number, data: Partial<SellerPackagePayment>): Promise<SellerPackagePayment | null> {
  return await prisma.SellerPackagePayment.update({
    where: { id },
    data,
  });
}

export async function deleteSellerPackagePayment(id: number): Promise<SellerPackagePayment | null> {
  return await prisma.SellerPackagePayment.delete({
    where: { id },
  });
}
