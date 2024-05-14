// models/CustomerPackage.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CustomerPackage {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCustomerPackageById(id: number): Promise<CustomerPackage | null> {
  return await prisma.CustomerPackage.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCustomerPackage(data: CustomerPackage): Promise<CustomerPackage> {
  return await prisma.CustomerPackage.create({
    data,
  });
}

export async function updateCustomerPackage(id: number, data: Partial<CustomerPackage>): Promise<CustomerPackage | null> {
  return await prisma.CustomerPackage.update({
    where: { id },
    data,
  });
}

export async function deleteCustomerPackage(id: number): Promise<CustomerPackage | null> {
  return await prisma.CustomerPackage.delete({
    where: { id },
  });
}
