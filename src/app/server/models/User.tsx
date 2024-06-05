// models/User.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface User {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getUserById(id: number): Promise<User | null> {
  return await prisma.User.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createUser(data: User): Promise<User> {
  return await prisma.User.create({
    data,
  });
}

export async function updateUser(id: number, data: Partial<User>): Promise<User | null> {
  return await prisma.User.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: number): Promise<User | null> {
  return await prisma.User.delete({
    where: { id },
  });
}
