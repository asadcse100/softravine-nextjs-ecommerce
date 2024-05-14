// models/AffiliatePayment.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AffiliatePayment {
  id: number;
  // Define other fields here
}

export async function getAffiliatePaymentById(id: number): Promise<AffiliatePayment | null> {
  return await prisma.affiliatePayment.findUnique({
    where: { id },
  });
}

export async function createAffiliatePayment(data: AffiliatePayment): Promise<AffiliatePayment> {
  return await prisma.affiliatePayment.create({
    data,
  });
}

export async function updateAffiliatePayment(id: number, data: Partial<AffiliatePayment>): Promise<AffiliatePayment | null> {
  return await prisma.affiliatePayment.update({
    where: { id },
    data,
  });
}

export async function deleteAffiliatePayment(id: number): Promise<AffiliatePayment | null> {
  return await prisma.affiliatePayment.delete({
    where: { id },
  });
}
