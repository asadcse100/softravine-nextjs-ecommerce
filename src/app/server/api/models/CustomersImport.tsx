// models/CustomersImport.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CustomersImport {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCustomersImportById(id: number): Promise<CustomersImport | null> {
  return await prisma.CustomersImport.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCustomersImport(data: CustomersImport): Promise<CustomersImport> {
  return await prisma.CustomersImport.create({
    data,
  });
}

export async function updateCustomersImport(id: number, data: Partial<CustomersImport>): Promise<CustomersImport | null> {
  return await prisma.CustomersImport.update({
    where: { id },
    data,
  });
}

export async function deleteCustomersImport(id: number): Promise<CustomersImport | null> {
  return await prisma.CustomersImport.delete({
    where: { id },
  });
}
