// models/Staff.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Staff {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getStaffById(id: number): Promise<Staff | null> {
  return await prisma.Staff.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createStaff(data: Staff): Promise<Staff> {
  return await prisma.Staff.create({
    data,
  });
}

export async function updateStaff(id: number, data: Partial<Staff>): Promise<Staff | null> {
  return await prisma.Staff.update({
    where: { id },
    data,
  });
}

export async function deleteStaff(id: number): Promise<Staff | null> {
  return await prisma.Staff.delete({
    where: { id },
  });
}
