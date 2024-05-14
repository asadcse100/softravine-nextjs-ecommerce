// models/TicketReply.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface TicketReply {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getTicketReplyById(id: number): Promise<TicketReply | null> {
  return await prisma.TicketReply.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createTicketReply(data: TicketReply): Promise<TicketReply> {
  return await prisma.TicketReply.create({
    data,
  });
}

export async function updateTicketReply(id: number, data: Partial<TicketReply>): Promise<TicketReply | null> {
  return await prisma.TicketReply.update({
    where: { id },
    data,
  });
}

export async function deleteTicketReply(id: number): Promise<TicketReply | null> {
  return await prisma.TicketReply.delete({
    where: { id },
  });
}
