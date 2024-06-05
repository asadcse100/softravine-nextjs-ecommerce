// models/Ticket.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Ticket {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getTicketById(id: number): Promise<Ticket | null> {
  return await prisma.Ticket.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createTicket(data: Ticket): Promise<Ticket> {
  return await prisma.Ticket.create({
    data,
  });
}

export async function updateTicket(id: number, data: Partial<Ticket>): Promise<Ticket | null> {
  return await prisma.Ticket.update({
    where: { id },
    data,
  });
}

export async function deleteTicket(id: number): Promise<Ticket | null> {
  return await prisma.Ticket.delete({
    where: { id },
  });
}
