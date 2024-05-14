// models/SellerWithdrawRequest.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SellerWithdrawRequest {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSellerWithdrawRequestById(id: number): Promise<SellerWithdrawRequest | null> {
  return await prisma.SellerWithdrawRequest.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSellerWithdrawRequest(data: SellerWithdrawRequest): Promise<SellerWithdrawRequest> {
  return await prisma.SellerWithdrawRequest.create({
    data,
  });
}

export async function updateSellerWithdrawRequest(id: number, data: Partial<SellerWithdrawRequest>): Promise<SellerWithdrawRequest | null> {
  return await prisma.SellerWithdrawRequest.update({
    where: { id },
    data,
  });
}

export async function deleteSellerWithdrawRequest(id: number): Promise<SellerWithdrawRequest | null> {
  return await prisma.SellerWithdrawRequest.delete({
    where: { id },
  });
}
