// models/Conversation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Conversation {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getConversationById(id: number): Promise<Conversation | null> {
  return await prisma.Conversation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createConversation(data: Conversation): Promise<Conversation> {
  return await prisma.Conversation.create({
    data,
  });
}

export async function updateConversation(id: number, data: Partial<Conversation>): Promise<Conversation | null> {
  return await prisma.Conversation.update({
    where: { id },
    data,
  });
}

export async function deleteConversation(id: number): Promise<Conversation | null> {
  return await prisma.Conversation.delete({
    where: { id },
  });
}
