// models/PickupPoint.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface PickupPoint {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getPickupPointById(id: number): Promise<PickupPoint | null> {
  return await prisma.PickupPoint.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createPickupPoint(data: PickupPoint): Promise<PickupPoint> {
  return await prisma.PickupPoint.create({
    data,
  });
}

export async function updatePickupPoint(id: number, data: Partial<PickupPoint>): Promise<PickupPoint | null> {
  return await prisma.PickupPoint.update({
    where: { id },
    data,
  });
}

export async function deletePickupPoint(id: number): Promise<PickupPoint | null> {
  return await prisma.PickupPoint.delete({
    where: { id },
  });
}
