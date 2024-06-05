// models/OtpConfiguration.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface OtpConfiguration {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getOtpConfigurationById(id: number): Promise<OtpConfiguration | null> {
  return await prisma.OtpConfiguration.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createOtpConfiguration(data: OtpConfiguration): Promise<OtpConfiguration> {
  return await prisma.OtpConfiguration.create({
    data,
  });
}

export async function updateOtpConfiguration(id: number, data: Partial<OtpConfiguration>): Promise<OtpConfiguration | null> {
  return await prisma.OtpConfiguration.update({
    where: { id },
    data,
  });
}

export async function deleteOtpConfiguration(id: number): Promise<OtpConfiguration | null> {
  return await prisma.OtpConfiguration.delete({
    where: { id },
  });
}
