// models/OrderDetail.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface OrderDetail {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getOrderDetailById(id: number): Promise<OrderDetail | null> {
  return await prisma.OrderDetail.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createOrderDetail(data: OrderDetail): Promise<OrderDetail> {
  return await prisma.OrderDetail.create({
    data,
  });
}

export async function updateOrderDetail(id: number, data: Partial<OrderDetail>): Promise<OrderDetail | null> {
  return await prisma.OrderDetail.update({
    where: { id },
    data,
  });
}

export async function deleteOrderDetail(id: number): Promise<OrderDetail | null> {
  return await prisma.OrderDetail.delete({
    where: { id },
  });
}
