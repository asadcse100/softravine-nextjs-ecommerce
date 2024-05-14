// models/CarrierRange.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CarrierRange {
  id: number;
  carrierId: number;
  // Define other fields here
}

export async function getCarrierRangeById(id: number): Promise<CarrierRange | null> {
  return await prisma.carrierRange.findUnique({
    where: { id },
    include: {
      carrier: true,
      carrier_range_prices: true,
    },
  });
}

export async function createCarrierRange(data: CarrierRange): Promise<CarrierRange> {
  return await prisma.carrierRange.create({
    data,
  });
}

export async function updateCarrierRange(id: number, data: Partial<CarrierRange>): Promise<CarrierRange | null> {
  return await prisma.carrierRange.update({
    where: { id },
    data,
  });
}

export async function deleteCarrierRange(id: number): Promise<CarrierRange | null> {
  return await prisma.carrierRange.delete({
    where: { id },
  });
}
