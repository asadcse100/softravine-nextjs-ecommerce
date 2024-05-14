// models/Payment.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Payment {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getPaymentById(id: number): Promise<Payment | null> {
  return await prisma.Payment.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createPayment(data: Payment): Promise<Payment> {
  return await prisma.Payment.create({
    data,
  });
}

export async function updatePayment(id: number, data: Partial<Payment>): Promise<Payment | null> {
  return await prisma.Payment.update({
    where: { id },
    data,
  });
}

export async function deletePayment(id: number): Promise<Payment | null> {
  return await prisma.Payment.delete({
    where: { id },
  });
}
