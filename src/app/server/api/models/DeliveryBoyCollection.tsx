// models/DeliveryBoyCollection.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface DeliveryBoyCollection {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getDeliveryBoyCollectionById(id: number): Promise<DeliveryBoyCollection | null> {
  return await prisma.DeliveryBoyCollection.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createDeliveryBoyCollection(data: DeliveryBoyCollection): Promise<DeliveryBoyCollection> {
  return await prisma.DeliveryBoyCollection.create({
    data,
  });
}

export async function updateDeliveryBoyCollection(id: number, data: Partial<DeliveryBoyCollection>): Promise<DeliveryBoyCollection | null> {
  return await prisma.DeliveryBoyCollection.update({
    where: { id },
    data,
  });
}

export async function deleteDeliveryBoyCollection(id: number): Promise<DeliveryBoyCollection | null> {
  return await prisma.DeliveryBoyCollection.delete({
    where: { id },
  });
}
