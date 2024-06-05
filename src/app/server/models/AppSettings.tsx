// models/AppSettings.ts
import { PrismaClient, Currency } from '@prisma/client';

const prisma = new PrismaClient();

export interface AppSettings {
  id: number;
  currencyId: number;
  // Define other fields here
}

export async function getAppSettingsById(id: number): Promise<AppSettings | null> {
  return await prisma.appSettings.findUnique({
    where: { id },
    include: {
      currency: true,
    },
  });
}

export async function createAppSettings(data: AppSettings): Promise<AppSettings> {
  return await prisma.appSettings.create({
    data,
  });
}

export async function updateAppSettings(id: number, data: Partial<AppSettings>): Promise<AppSettings | null> {
  return await prisma.appSettings.update({
    where: { id },
    data,
  });
}

export async function deleteAppSettings(id: number): Promise<AppSettings | null> {
  return await prisma.appSettings.delete({
    where: { id },
  });
}
