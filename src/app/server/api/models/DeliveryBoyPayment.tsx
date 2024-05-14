// models/DeliveryBoyPayment.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface DeliveryBoyPayment {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getDeliveryBoyPaymentById(id: number): Promise<DeliveryBoyPayment | null> {
  return await prisma.DeliveryBoyPayment.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createDeliveryBoyPayment(data: DeliveryBoyPayment): Promise<DeliveryBoyPayment> {
  return await prisma.DeliveryBoyPayment.create({
    data,
  });
}

export async function updateDeliveryBoyPayment(id: number, data: Partial<DeliveryBoyPayment>): Promise<DeliveryBoyPayment | null> {
  return await prisma.DeliveryBoyPayment.update({
    where: { id },
    data,
  });
}

export async function deleteDeliveryBoyPayment(id: number): Promise<DeliveryBoyPayment | null> {
  return await prisma.DeliveryBoyPayment.delete({
    where: { id },
  });
}
