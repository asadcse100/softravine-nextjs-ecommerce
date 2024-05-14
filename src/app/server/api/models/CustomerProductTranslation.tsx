// models/CustomerProductTranslation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CustomerProductTranslation {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCustomerProductTranslationById(id: number): Promise<CustomerProductTranslation | null> {
  return await prisma.CustomerProductTranslation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCustomerProductTranslation(data: CustomerProductTranslation): Promise<CustomerProductTranslation> {
  return await prisma.CustomerProductTranslation.create({
    data,
  });
}

export async function updateCustomerProductTranslation(id: number, data: Partial<CustomerProductTranslation>): Promise<CustomerProductTranslation | null> {
  return await prisma.CustomerProductTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteCustomerProductTranslation(id: number): Promise<CustomerProductTranslation | null> {
  return await prisma.CustomerProductTranslation.delete({
    where: { id },
  });
}
