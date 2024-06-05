// controllers/brandController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllBrands(search: string | null) {
  const where = search ? { name: { contains: search, mode: 'insensitive' } } : {};

  return prisma.brand.findMany({
    where,
    orderBy: { name: 'asc' },
  });
}

export async function createBrand(name: string, metaTitle: string, metaDescription: string, slug: string | null, logo: string | null) {
    const brand = await prisma.brand.create({
      data: {
        name,
        slug: slug || `${name.replace(/\s+/g, '-').replace(/[^A-Za-z0-9\-]/g, '')}-${Math.random().toString(36).substring(7)}`,
        meta_title: metaTitle,
        meta_description: metaDescription,
        logo,
      },
    });
  
    await prisma.brandTranslation.create({
      data: {
        lang: process.env.DEFAULT_LANGUAGE || 'en',
        name,
        brand_id: brand.id,
      },
    });
  
    return brand;
  }

  export async function updateBrand(id: number, name: string, metaTitle: string, metaDescription: string, slug: string | null, logo: string | null, lang: string) {
    const brand = await prisma.brand.update({
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
    await prisma.product.deleteMany({ where: { brandId: id } });
  
    // Delete brand translations
    await prisma.brandTranslation.deleteMany({ where: { brandId: id } });
  
    // Delete the brand
    await prisma.brand.delete({ where: { id } });
  }