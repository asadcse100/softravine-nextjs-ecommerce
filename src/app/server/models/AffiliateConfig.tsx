import { PrismaClient } from '@prisma/client';
import { AffiliateConfigData } from '../types/affiliateConfig';

const prisma = new PrismaClient();

export const createAffiliateConfig = async (affiliateConfigData: AffiliateConfigData) => {
  return await prisma.affiliateConfig.create({ data: affiliateConfigData });
};

export const getAffiliateConfig = async (id: string) => {
  return await prisma.address.findUnique({ where: { id } });
};

export const updateAffiliateConfig = async (id: string, affiliateConfigData: Partial<AffiliateConfigData>) => {
  return await prisma.address.update({
    where: { id },
    data: affiliateConfigData,
  });
};

export const deleteAffiliateConfig = async (id: string) => {
  return await prisma.address.delete({ where: { id } });
};