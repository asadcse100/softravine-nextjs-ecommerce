// models/Search.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Search {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSearchById(id: number): Promise<Search | null> {
  return await prisma.Search.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createSearch(data: Search): Promise<Search> {
  return await prisma.Search.create({
    data,
  });
}

export async function updateSearch(id: number, data: Partial<Search>): Promise<Search | null> {
  return await prisma.Search.update({
    where: { id },
    data,
  });
}

export async function deleteSearch(id: number): Promise<Search | null> {
  return await prisma.Search.delete({
    where: { id },
  });
}
