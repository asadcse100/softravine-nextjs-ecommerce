// models/CustomerPackageTranslation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CustomerPackageTranslation {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCustomerPackageTranslationById(id: number): Promise<CustomerPackageTranslation | null> {
  return await prisma.CustomerPackageTranslation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCustomerPackageTranslation(data: CustomerPackageTranslation): Promise<CustomerPackageTranslation> {
  return await prisma.CustomerPackageTranslation.create({
    data,
  });
}

export async function updateCustomerPackageTranslation(id: number, data: Partial<CustomerPackageTranslation>): Promise<CustomerPackageTranslation | null> {
  return await prisma.CustomerPackageTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteCustomerPackageTranslation(id: number): Promise<CustomerPackageTranslation | null> {
  return await prisma.CustomerPackageTranslation.delete({
    where: { id },
  });
}
