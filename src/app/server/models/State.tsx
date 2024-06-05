// models/State.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface State {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getStateById(id: number): Promise<State | null> {
  return await prisma.State.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createState(data: State): Promise<State> {
  return await prisma.State.create({
    data,
  });
}

export async function updateState(id: number, data: Partial<State>): Promise<State | null> {
  return await prisma.State.update({
    where: { id },
    data,
  });
}

export async function deleteState(id: number): Promise<State | null> {
  return await prisma.State.delete({
    where: { id },
  });
}
