// models/ProxyPayment.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ProxyPayment {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getProxyPaymentById(id: number): Promise<ProxyPayment | null> {
  return await prisma.ProxyPayment.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createProxyPayment(data: ProxyPayment): Promise<ProxyPayment> {
  return await prisma.ProxyPayment.create({
    data,
  });
}

export async function updateProxyPayment(id: number, data: Partial<ProxyPayment>): Promise<ProxyPayment | null> {
  return await prisma.ProxyPayment.update({
    where: { id },
    data,
  });
}

export async function deleteProxyPayment(id: number): Promise<ProxyPayment | null> {
  return await prisma.ProxyPayment.delete({
    where: { id },
  });
}
