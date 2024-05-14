// models/AffiliateUser.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AffiliateUser {
  id: number;
  userId: number;
  // Define other fields here
}

export async function getAffiliateUserById(id: number): Promise<AffiliateUser | null> {
  return await prisma.affiliateUser.findUnique({
    where: { id },
    include: {
      user: true,
      affiliate_payments: {
        orderBy: { createdAt: 'desc' },
        take: 12,
      },
    },
  });
}

export async function createAffiliateUser(data: AffiliateUser): Promise<AffiliateUser> {
  return await prisma.affiliateUser.create({
    data,
  });
}

export async function updateAffiliateUser(id: number, data: Partial<AffiliateUser>): Promise<AffiliateUser | null> {
  return await prisma.affiliateUser.update({
    where: { id },
    data,
  });
}

export async function deleteAffiliateUser(id: number): Promise<AffiliateUser | null> {
  return await prisma.affiliateUser.delete({
    where: { id },
  });
}
