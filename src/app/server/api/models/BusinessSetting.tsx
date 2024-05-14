// models/BusinessSetting.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface BusinessSetting {
  id: number;
  // Define other fields here
}

export async function getBusinessSettingById(id: number): Promise<BusinessSetting | null> {
  return await prisma.businessSetting.findUnique({
    where: { id },
  });
}

export async function createBusinessSetting(data: BusinessSetting): Promise<BusinessSetting> {
  return await prisma.businessSetting.create({
    data,
  });
}

export async function updateBusinessSetting(id: number, data: Partial<BusinessSetting>): Promise<BusinessSetting | null> {
  return await prisma.businessSetting.update({
    where: { id },
    data,
  });
}

export async function deleteBusinessSetting(id: number): Promise<BusinessSetting | null> {
  return await prisma.businessSetting.delete({
    where: { id },
  });
}
