// models/Wallet.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Wallet {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getWalletById(id: number): Promise<Wallet | null> {
  return await prisma.Wallet.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createWallet(data: Wallet): Promise<Wallet> {
  return await prisma.Wallet.create({
    data,
  });
}

export async function updateWallet(id: number, data: Partial<Wallet>): Promise<Wallet | null> {
  return await prisma.Wallet.update({
    where: { id },
    data,
  });
}

export async function deleteWallet(id: number): Promise<Wallet | null> {
  return await prisma.Wallet.delete({
    where: { id },
  });
}
