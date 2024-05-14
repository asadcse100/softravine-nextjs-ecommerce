// models/Country.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Country {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCountryById(id: number): Promise<Country | null> {
  return await prisma.Country.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCountry(data: Country): Promise<Country> {
  return await prisma.Country.create({
    data,
  });
}

export async function updateCountry(id: number, data: Partial<Country>): Promise<Country | null> {
  return await prisma.Country.update({
    where: { id },
    data,
  });
}

export async function deleteCountry(id: number): Promise<Country | null> {
  return await prisma.Country.delete({
    where: { id },
  });
}
