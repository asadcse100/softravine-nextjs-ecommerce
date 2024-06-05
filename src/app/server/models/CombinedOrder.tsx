// models/CombinedOrder.ts
import { PrismaClient, User, Order } from '@prisma/client';

const prisma = new PrismaClient();

export interface CombinedOrder {
  id: number;
  userId: number;
  // Define other fields here
}

export async function getCombinedOrderById(id: number): Promise<CombinedOrder | null> {
  return await prisma.combinedOrder.findUnique({
    where: { id },
    include: {
      orders: true,
      user: true,
    },
  });
}

export async function createCombinedOrder(data: CombinedOrder): Promise<CombinedOrder> {
  return await prisma.combinedOrder.create({
    data,
  });
}

export async function updateCombinedOrder(id: number, data: Partial<CombinedOrder>): Promise<CombinedOrder | null> {
  return await prisma.combinedOrder.update({
    where: { id },
    data,
  });
}

export async function deleteCombinedOrder(id: number): Promise<CombinedOrder | null> {
  return await prisma.combinedOrder.delete({
    where: { id },
  });
}
