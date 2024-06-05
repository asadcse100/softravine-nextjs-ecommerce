// models/DeliveryHistory.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface DeliveryHistory {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getDeliveryHistoryById(id: number): Promise<DeliveryHistory | null> {
  return await prisma.DeliveryHistory.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createDeliveryHistory(data: DeliveryHistory): Promise<DeliveryHistory> {
  return await prisma.DeliveryHistory.create({
    data,
  });
}

export async function updateDeliveryHistory(id: number, data: Partial<DeliveryHistory>): Promise<DeliveryHistory | null> {
  return await prisma.DeliveryHistory.update({
    where: { id },
    data,
  });
}

export async function deleteDeliveryHistory(id: number): Promise<DeliveryHistory | null> {
  return await prisma.DeliveryHistory.delete({
    where: { id },
  });
}
