// models/Currency.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Currency {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCurrencyById(id: number): Promise<Currency | null> {
  return await prisma.Currency.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCurrency(data: Currency): Promise<Currency> {
  return await prisma.Currency.create({
    data,
  });
}

export async function updateCurrency(id: number, data: Partial<Currency>): Promise<Currency | null> {
  return await prisma.Currency.update({
    where: { id },
    data,
  });
}

export async function deleteCurrency(id: number): Promise<Currency | null> {
  return await prisma.Currency.delete({
    where: { id },
  });
}
