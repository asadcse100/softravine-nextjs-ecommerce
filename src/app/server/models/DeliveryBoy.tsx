// models/DeliveryBoy.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface DeliveryBoy {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getDeliveryBoyById(id: number): Promise<DeliveryBoy | null> {
  return await prisma.DeliveryBoy.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createDeliveryBoy(data: DeliveryBoy): Promise<DeliveryBoy> {
  return await prisma.DeliveryBoy.create({
    data,
  });
}

export async function updateDeliveryBoy(id: number, data: Partial<DeliveryBoy>): Promise<DeliveryBoy | null> {
  return await prisma.DeliveryBoy.update({
    where: { id },
    data,
  });
}

export async function deleteDeliveryBoy(id: number): Promise<DeliveryBoy | null> {
  return await prisma.DeliveryBoy.delete({
    where: { id },
  });
}
