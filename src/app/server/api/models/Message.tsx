// models/Message.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Message {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getMessageById(id: number): Promise<Message | null> {
  return await prisma.Message.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createMessage(data: Message): Promise<Message> {
  return await prisma.Message.create({
    data,
  });
}

export async function updateMessage(id: number, data: Partial<Message>): Promise<Message | null> {
  return await prisma.Message.update({
    where: { id },
    data,
  });
}

export async function deleteMessage(id: number): Promise<Message | null> {
  return await prisma.Message.delete({
    where: { id },
  });
}
