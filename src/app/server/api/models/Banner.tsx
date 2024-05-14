// models/Banner.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Banner {
  id: number;
  // Define other fields here
}

export async function getBannerById(id: number): Promise<Banner | null> {
  return await prisma.banner.findUnique({
    where: { id },
  });
}

export async function createBanner(data: Banner): Promise<Banner> {
  return await prisma.banner.create({
    data,
  });
}

export async function updateBanner(id: number, data: Partial<Banner>): Promise<Banner | null> {
  return await prisma.banner.update({
    where: { id },
    data,
  });
}

export async function deleteBanner(id: number): Promise<Banner | null> {
  return await prisma.banner.delete({
    where: { id },
  });
}
