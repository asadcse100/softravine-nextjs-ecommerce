// models/PasswordReset.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface PasswordReset {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getPasswordResetById(id: number): Promise<PasswordReset | null> {
  return await prisma.PasswordReset.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createPasswordReset(data: PasswordReset): Promise<PasswordReset> {
  return await prisma.PasswordReset.create({
    data,
  });
}

export async function updatePasswordReset(id: number, data: Partial<PasswordReset>): Promise<PasswordReset | null> {
  return await prisma.PasswordReset.update({
    where: { id },
    data,
  });
}

export async function deletePasswordReset(id: number): Promise<PasswordReset | null> {
  return await prisma.PasswordReset.delete({
    where: { id },
  });
}
