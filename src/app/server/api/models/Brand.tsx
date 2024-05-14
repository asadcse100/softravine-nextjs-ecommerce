// models/Brand.ts
import { PrismaClient, BrandTranslation, Upload } from '@prisma/client';

const prisma = new PrismaClient();

export interface Brand {
  id: number;
  logo: number;
  // Define other fields here
}

export async function getBrandById(id: number): Promise<Brand | null> {
  return await prisma.brand.findUnique({
    where: { id },
    include: {
      brand_translations: true,
      brandLogo: true,
    },
  });
}

export async function createBrand(data: Brand): Promise<Brand> {
  return await prisma.brand.create({
    data,
  });
}

export async function updateBrand(id: number, data: Partial<Brand>): Promise<Brand | null> {
  return await prisma.brand.update({
    where: { id },
    data,
  });
}

export async function deleteBrand(id: number): Promise<Brand | null> {
  return await prisma.brand.delete({
    where: { id },
  });
}

export async function getBrandTranslation(brandId: number, lang: string, field: string): Promise<string | null> {
  const brand = await prisma.brand.findUnique({
    where: { id: brandId },
    include: {
      brand_translations: {
        where: { lang },
      },
    },
  });
  if (brand && brand.brand_translations.length > 0) {
    return brand.brand_translations[0][field];
  } else {
    return null;
  }
}
