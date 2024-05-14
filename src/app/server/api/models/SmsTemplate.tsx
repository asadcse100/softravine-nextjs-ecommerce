// models/SmsTemplate.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SmsTemplate {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getSmsTemplateById(id: number): Promise<SmsTemplate | null> {
  return await prisma.Country.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createCountry(data: Country): Promise<SmsTemplate> {
  return await prisma.SmsTemplate.create({
    data,
  });
}

export async function updateSmsTemplate(id: number, data: Partial<SmsTemplate>): Promise<SmsTemplate | null> {
  return await prisma.SmsTemplate.update({
    where: { id },
    data,
  });
}

export async function deleteSmsTemplate(id: number): Promise<SmsTemplate | null> {
  return await prisma.SmsTemplate.delete({
    where: { id },
  });
}
