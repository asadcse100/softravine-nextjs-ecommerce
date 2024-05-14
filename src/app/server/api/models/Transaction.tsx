// models/Transaction.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Transaction {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getTransactionById(id: number): Promise<Transaction | null> {
  return await prisma.Transaction.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createTransaction(data: Transaction): Promise<Transaction> {
  return await prisma.Transaction.create({
    data,
  });
}

export async function updateTransaction(id: number, data: Partial<Transaction>): Promise<Transaction | null> {
  return await prisma.Transaction.update({
    where: { id },
    data,
  });
}

export async function deleteTransaction(id: number): Promise<Transaction | null> {
  return await prisma.Transaction.delete({
    where: { id },
  });
}
