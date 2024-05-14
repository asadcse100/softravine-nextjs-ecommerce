// models/Permission.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Permission {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getPermissionById(id: number): Promise<Permission | null> {
  return await prisma.Permission.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createPermission(data: Permission): Promise<Permission> {
  return await prisma.Permission.create({
    data,
  });
}

export async function updatePermission(id: number, data: Partial<Permission>): Promise<Permission | null> {
  return await prisma.Permission.update({
    where: { id },
    data,
  });
}

export async function deletePermission(id: number): Promise<Permission | null> {
  return await prisma.Permission.delete({
    where: { id },
  });
}
