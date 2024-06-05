// models/Zone.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Zone {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getZoneById(id: number): Promise<Zone | null> {
  return await prisma.Zone.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createZone(data: Zone): Promise<Zone> {
  return await prisma.Zone.create({
    data,
  });
}

export async function updateZone(id: number, data: Partial<Zone>): Promise<Zone | null> {
  return await prisma.Zone.update({
    where: { id },
    data,
  });
}

export async function deleteZone(id: number): Promise<Zone | null> {
  return await prisma.Zone.delete({
    where: { id },
  });
}
