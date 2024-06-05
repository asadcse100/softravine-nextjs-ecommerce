// models/Policy.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Policy {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getPolicyById(id: number): Promise<Policy | null> {
  return await prisma.Policy.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createPolicy(data: Policy): Promise<Policy> {
  return await prisma.Policy.create({
    data,
  });
}

export async function updatePolicy(id: number, data: Partial<Policy>): Promise<Policy | null> {
  return await prisma.Policy.update({
    where: { id },
    data,
  });
}

export async function deletePolicy(id: number): Promise<Policy | null> {
  return await prisma.Policy.delete({
    where: { id },
  });
}
