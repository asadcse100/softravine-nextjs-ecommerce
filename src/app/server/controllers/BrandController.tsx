// controllers/brandController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  name: string;
  logo: string;
  top: number;
  meta_title: string;
  meta_description: string;
  created_at?: string;
};

export const selectBrands = async () => {
  try{
      const brands = await prisma.brands.findMany({
        select: {
            name: true,
        },
    });
    return { success: true, data: brands };

  }catch(error){
      console.error("Error fetching brands:", error);
      return { success: false, error };
  }
}

export const getAllBrands = async (search: string | null) => {
  const where = search ? { name: { contains: search, mode: 'insensitive' } } : {};

  try {
    const brands = await prisma.brands.findMany({
      where,
      orderBy: { name: 'asc' },
    });
    return { success: true, data: brands };
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { success: false, error };
  }
}

export async function createOrUpdateBrand(name: string, metaTitle: string, metaDescription: string, slug: string | null, logo: string | null) {
  const brand = await prisma.brands.create({
    data: {
      name,
      slug: slug || `${name.replace(/\s+/g, '-').replace(/[^A-Za-z0-9\-]/g, '')}-${Math.random().toString(36).substring(7)}`,
      meta_title: metaTitle,
      meta_description: metaDescription,
      logo,
    },
  });

  await prisma.brand_translations.create({
    data: {
      lang: process.env.DEFAULT_LANGUAGE || 'en',
      name,
      brand_id: brand.id,
    },
  });

  return brand;
}

export async function updateBrand(id: number, name: string, metaTitle: string, metaDescription: string, slug: string | null, logo: string | null, lang: string) {
  const brand = await prisma.brands.update({
    where: { id },
    data: {
      name,
      meta_title: metaTitle,
      meta_description: metaDescription,
      slug: slug || `${name.replace(/\s+/g, '-').replace(/[^A-Za-z0-9\-]/g, '')}-${Math.random().toString(36).substring(7)}`,
      logo,
      translations: {
        upsert: {
          where: { lang_brand_id: { lang, brand_id: id } },
          update: { name },
          create: { lang, name },
        },
      },
    },
  });

  return brand;
}

export async function deleteBrand(id: number) {
  // Delete products associated with the brand
  await prisma.products.deleteMany({ where: { brand_id: id } });

  // Delete brand translations
  await prisma.brand_translations.deleteMany({ where: { brand_id: id } });

  // Delete the brand
  await prisma.brands.delete({ where: { id } });
}