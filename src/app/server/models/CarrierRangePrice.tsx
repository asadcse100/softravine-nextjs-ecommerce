// models/CarrierRangePrice.ts
import { PrismaClient, Carrier, CarrierRange, Zone } from '@prisma/client';

const prisma = new PrismaClient();

export interface CarrierRangePrice {
  id: number;
  carrierId: number;
  carrierRangeId: number;
  zoneId: number;
  // Define other fields here
}

export async function getCarrierRangePriceById(id: number): Promise<CarrierRangePrice | null> {
  return await prisma.carrierRangePrice.findUnique({
    where: { id },
    include: {
      carrier: true,
      carrier_ranges: true,
      zone: true,
    },
  });
}

export async function createCarrierRangePrice(data: CarrierRangePrice): Promise<CarrierRangePrice> {
  return await prisma.carrierRangePrice.create({
    data,
  });
}

export async function updateCarrierRangePrice(id: number, data: Partial<CarrierRangePrice>): Promise<CarrierRangePrice | null> {
  return await prisma.carrierRangePrice.update({
    where: { id },
    data,
  });
}

export async function deleteCarrierRangePrice(id: number): Promise<CarrierRangePrice | null> {
  return await prisma.carrierRangePrice.delete({
    where: { id },
  });
}
