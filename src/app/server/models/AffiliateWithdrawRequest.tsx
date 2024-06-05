// models/AffiliateWithdrawRequest.ts
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export interface AffiliateWithdrawRequest {
  id: number;
  userId: number;
  // Define other fields here
}

export async function getAffiliateWithdrawRequestById(id: number): Promise<AffiliateWithdrawRequest | null> {
  return await prisma.affiliateWithdrawRequest.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
}

export async function createAffiliateWithdrawRequest(data: AffiliateWithdrawRequest): Promise<AffiliateWithdrawRequest> {
  return await prisma.affiliateWithdrawRequest.create({
    data,
  });
}

export async function updateAffiliateWithdrawRequest(id: number, data: Partial<AffiliateWithdrawRequest>): Promise<AffiliateWithdrawRequest | null> {
  return await prisma.affiliateWithdrawRequest.update({
    where: { id },
    data,
  });
}

export async function deleteAffiliateWithdrawRequest(id: number): Promise<AffiliateWithdrawRequest | null> {
  return await prisma.affiliateWithdrawRequest.delete({
    where: { id },
  });
}
