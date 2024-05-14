// models/Order.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Order {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getOrderById(id: number): Promise<Order | null> {
  return await prisma.Order.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createOrder(data: Order): Promise<Order> {
  return await prisma.Order.create({
    data,
  });
}

export async function updateOrder(id: number, data: Partial<Order>): Promise<Order | null> {
  return await prisma.Order.update({
    where: { id },
    data,
  });
}

export async function deleteOrder(id: number): Promise<Order | null> {
  return await prisma.Order.delete({
    where: { id },
  });
}
