// models/AffiliateOption.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AffiliateOption {
  id: number;
  // Define other fields here
}

export async function getAffiliateOptionById(id: number): Promise<AffiliateOption | null> {
  return await prisma.affiliateOption.findUnique({
    where: { id },
  });
}

export async function createAffiliateOption(data: AffiliateOption): Promise<AffiliateOption> {
  return await prisma.affiliateOption.create({
    data,
  });
}

export async function updateAffiliateOption(id: number, data: Partial<AffiliateOption>): Promise<AffiliateOption | null> {
  return await prisma.affiliateOption.update({
    where: { id },
    data,
  });
}

export async function deleteAffiliateOption(id: number): Promise<AffiliateOption | null> {
  return await prisma.affiliateOption.delete({
    where: { id },
  });
}
