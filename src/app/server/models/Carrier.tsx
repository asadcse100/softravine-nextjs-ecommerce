// models/Carrier.ts
import { PrismaClient, CarrierRange, CarrierRangePrice } from '@prisma/client';

const prisma = new PrismaClient();

export interface Carrier {
  id: number;
  // Define other fields here
}

export async function getCarrierById(id: number): Promise<Carrier | null> {
  return await prisma.carrier.findUnique({
    where: { id },
    include: {
      carrier_ranges: true,
      carrier_range_prices: true,
    },
  });
}

export async function createCarrier(data: Carrier): Promise<Carrier> {
  return await prisma.carrier.create({
    data,
  });
}

export async function updateCarrier(id: number, data: Partial<Carrier>): Promise<Carrier | null> {
  return await prisma.carrier.update({
    where: { id },
    data,
  });
}

export async function deleteCarrier(id: number): Promise<Carrier | null> {
  return await prisma.carrier.delete({
    where: { id },
  });
}

export async function getActiveCarriers(): Promise<Carrier[]> {
  return await prisma.carrier.findMany({
    where: {
      status: 1,
    },
  });
}
