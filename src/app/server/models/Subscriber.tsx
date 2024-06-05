// models/Subscriber.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Subscriber {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSubscriberById(id: number): Promise<Subscriber | null> {
  return await prisma.Subscriber.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSubscriber(data: Subscriber): Promise<Subscriber> {
  return await prisma.Subscriber.create({
    data,
  });
}

export async function updateSubscriber(id: number, data: Partial<Subscriber>): Promise<Subscriber | null> {
  return await prisma.Subscriber.update({
    where: { id },
    data,
  });
}

export async function deleteSubscriber(id: number): Promise<Subscriber | null> {
  return await prisma.Subscriber.delete({
    where: { id },
  });
}
