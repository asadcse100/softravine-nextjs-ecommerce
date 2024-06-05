// models/ManualPaymentMethod.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ManualPaymentMethod {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getManualPaymentMethodById(id: number): Promise<ManualPaymentMethod | null> {
  return await prisma.ManualPaymentMethod.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createManualPaymentMethod(data: ManualPaymentMethod): Promise<ManualPaymentMethod> {
  return await prisma.ManualPaymentMethod.create({
    data,
  });
}

export async function updateManualPaymentMethod(id: number, data: Partial<ManualPaymentMethod>): Promise<ManualPaymentMethod | null> {
  return await prisma.ManualPaymentMethod.update({
    where: { id },
    data,
  });
}

export async function deleteManualPaymentMethod(id: number): Promise<ManualPaymentMethod | null> {
  return await prisma.ManualPaymentMethod.delete({
    where: { id },
  });
}
