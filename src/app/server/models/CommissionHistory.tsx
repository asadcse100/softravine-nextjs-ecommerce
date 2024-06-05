// models/CommissionHistory.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface CommissionHistory {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getCommissionHistoryById(id: number): Promise<CommissionHistory | null> {
  return await prisma.commissionHistory.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCommissionHistory(data: CommissionHistory): Promise<CommissionHistory> {
  return await prisma.commissionHistory.create({
    data,
  });
}

export async function updateCommissionHistory(id: number, data: Partial<CommissionHistory>): Promise<CommissionHistory | null> {
  return await prisma.commissionHistory.update({
    where: { id },
    data,
  });
}

export async function deleteCommissionHistory(id: number): Promise<CommissionHistory | null> {
  return await prisma.commissionHistory.delete({
    where: { id },
  });
}
