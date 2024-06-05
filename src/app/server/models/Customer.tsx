// models/Customer.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Customer {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCustomerById(id: number): Promise<Customer | null> {
  return await prisma.Customer.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCustomer(data: Customer): Promise<Customer> {
  return await prisma.Customer.create({
    data,
  });
}

export async function updateCustomer(id: number, data: Partial<Customer>): Promise<Customer | null> {
  return await prisma.Customer.update({
    where: { id },
    data,
  });
}

export async function deleteCustomer(id: number): Promise<Customer | null> {
  return await prisma.Customer.delete({
    where: { id },
  });
}
