// models/AffiliateConfig.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AffiliateConfig {
  id: number;
  // Define other fields here
}

export async function getAffiliateConfig(): Promise<AffiliateConfig | null> {
  return await prisma.affiliateConfig.findFirst();
}

export async function createAffiliateConfig(data: AffiliateConfig): Promise<AffiliateConfig> {
  return await prisma.affiliateConfig.create({
    data,
  });
}

export async function updateAffiliateConfig(data: AffiliateConfig): Promise<AffiliateConfig | null> {
  const { id, ...rest } = data;
  return await prisma.affiliateConfig.update({
    where: { id },
    data: rest,
  });
}

export async function deleteAffiliateConfig(id: number): Promise<AffiliateConfig | null> {
  return await prisma.affiliateConfig.delete({
    where: { id },
  });
}
