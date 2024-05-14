// models/Page.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Page {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getPageById(id: number): Promise<Page | null> {
  return await prisma.Page.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createPage(data: Page): Promise<Page> {
  return await prisma.Page.create({
    data,
  });
}

export async function updatePage(id: number, data: Partial<Page>): Promise<Page | null> {
  return await prisma.Page.update({
    where: { id },
    data,
  });
}

export async function deletePage(id: number): Promise<Page | null> {
  return await prisma.Page.delete({
    where: { id },
  });
}
