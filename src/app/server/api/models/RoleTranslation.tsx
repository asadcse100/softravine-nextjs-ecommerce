// models/RoleTranslation.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface RoleTranslation {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getRoleTranslationById(id: number): Promise<RoleTranslation | null> {
  return await prisma.RoleTranslation.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createRoleTranslation(data: RoleTranslation): Promise<RoleTranslation> {
  return await prisma.RoleTranslation.create({
    data,
  });
}

export async function updateRoleTranslation(id: number, data: Partial<RoleTranslation>): Promise<RoleTranslation | null> {
  return await prisma.RoleTranslation.update({
    where: { id },
    data,
  });
}

export async function deleteRoleTranslation(id: number): Promise<RoleTranslation | null> {
  return await prisma.RoleTranslation.delete({
    where: { id },
  });
}
