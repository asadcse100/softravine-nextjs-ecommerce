// models/AffiliateStats.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AffiliateStats {
  id: number;
  // Define other fields here
}

export async function getAffiliateStatsById(id: number): Promise<AffiliateStats | null> {
  return await prisma.affiliateStats.findUnique({
    where: { id },
  });
}

export async function createAffiliateStats(data: AffiliateStats): Promise<AffiliateStats> {
  return await prisma.affiliateStats.create({
    data,
  });
}

export async function updateAffiliateStats(id: number, data: Partial<AffiliateStats>): Promise<AffiliateStats | null> {
  return await prisma.affiliateStats.update({
    where: { id },
    data,
  });
}

export async function deleteAffiliateStats(id: number): Promise<AffiliateStats | null> {
  return await prisma.affiliateStats.delete({
    where: { id },
  });
}
