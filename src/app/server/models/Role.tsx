// models/Role.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Role {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getRoleById(id: number): Promise<Role | null> {
  return await prisma.Role.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createRole(data: Role): Promise<Role> {
  return await prisma.Role.create({
    data,
  });
}

export async function updateRole(id: number, data: Partial<Role>): Promise<Role | null> {
  return await prisma.Role.update({
    where: { id },
    data,
  });
}

export async function deleteRole(id: number): Promise<Role | null> {
  return await prisma.Role.delete({
    where: { id },
  });
}
