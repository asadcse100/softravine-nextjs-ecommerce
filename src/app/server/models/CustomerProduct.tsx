// models/CustomerProduct.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CustomerProduct {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCustomerProductById(id: number): Promise<CustomerProduct | null> {
  return await prisma.CustomerProduct.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCustomerProduct(data: CustomerProduct): Promise<CustomerProduct> {
  return await prisma.CustomerProduct.create({
    data,
  });
}

export async function updateCustomerProduct(id: number, data: Partial<CustomerProduct>): Promise<CustomerProduct | null> {
  return await prisma.CustomerProduct.update({
    where: { id },
    data,
  });
}

export async function deleteCustomerProduct(id: number): Promise<CustomerProduct | null> {
  return await prisma.CustomerProduct.delete({
    where: { id },
  });
}
