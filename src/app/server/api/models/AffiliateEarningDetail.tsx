// models/AffiliateEarningDetail.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AffiliateEarningDetail {
  id: number;
  userId: number;
  // Define other fields here
}

export async function getAffiliateEarningDetailById(id: number): Promise<AffiliateEarningDetail | null> {
  return await prisma.affiliateEarningDetail.findUnique({
    where: { id },
  });
}

export async function createAffiliateEarningDetail(data: AffiliateEarningDetail): Promise<AffiliateEarningDetail> {
  return await prisma.affiliateEarningDetail.create({
    data,
  });
}

export async function updateAffiliateEarningDetail(id: number, data: Partial<AffiliateEarningDetail>): Promise<AffiliateEarningDetail | null> {
  return await prisma.affiliateEarningDetail.update({
    where: { id },
    data,
  });
}

export async function deleteAffiliateEarningDetail(id: number): Promise<AffiliateEarningDetail | null> {
  return await prisma.affiliateEarningDetail.delete({
    where: { id },
  });
}
