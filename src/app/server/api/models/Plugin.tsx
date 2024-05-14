// models/Plugin.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Plugin {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getPluginById(id: number): Promise<Plugin | null> {
  return await prisma.Plugin.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createPlugin(data: Plugin): Promise<Plugin> {
  return await prisma.Plugin.create({
    data,
  });
}

export async function updatePlugin(id: number, data: Partial<Plugin>): Promise<Plugin | null> {
  return await prisma.Plugin.update({
    where: { id },
    data,
  });
}

export async function deletePlugin(id: number): Promise<Plugin | null> {
  return await prisma.Plugin.delete({
    where: { id },
  });
}
