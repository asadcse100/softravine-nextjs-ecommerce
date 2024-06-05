// models/CustomerPackagePayment.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CustomerPackagePayment {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCustomerPackagePaymentById(id: number): Promise<CustomerPackagePayment | null> {
  return await prisma.CustomerPackagePayment.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCustomerPackagePayment(data: CustomerPackagePayment): Promise<CustomerPackagePayment> {
  return await prisma.CustomerPackagePayment.create({
    data,
  });
}

export async function updateCustomerPackagePayment(id: number, data: Partial<CustomerPackagePayment>): Promise<CustomerPackagePayment | null> {
  return await prisma.CustomerPackagePayment.update({
    where: { id },
    data,
  });
}

export async function deleteCustomerPackagePayment(id: number): Promise<CustomerPackagePayment | null> {
  return await prisma.CustomerPackagePayment.delete({
    where: { id },
  });
}
