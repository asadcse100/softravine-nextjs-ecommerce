// models/RefundRequest.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface RefundRequest {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getRefundRequestById(id: number): Promise<RefundRequest | null> {
  return await prisma.RefundRequest.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createRefundRequest(data: RefundRequest): Promise<RefundRequest> {
  return await prisma.RefundRequest.create({
    data,
  });
}

export async function updateRefundRequest(id: number, data: Partial<RefundRequest>): Promise<RefundRequest | null> {
  return await prisma.RefundRequest.update({
    where: { id },
    data,
  });
}

export async function deleteRefundRequest(id: number): Promise<RefundRequest | null> {
  return await prisma.RefundRequest.delete({
    where: { id },
  });
}
