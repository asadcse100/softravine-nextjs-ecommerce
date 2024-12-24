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
  try {
    const brands = await prisma.brands.findMany({
      select: {
        name: true,
      },
    });
    return { success: true, data: brands };

  } catch (error) {
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

// export async function createOrUpdateBrand(name: string, metaTitle: string, metaDescription: string, slug: string | null, logo: string | null) {
//   const brand = await prisma.brands.create({
//     data: {
//       name,
//       slug: slug || `${name.replace(/\s+/g, '-').replace(/[^A-Za-z0-9\-]/g, '')}-${Math.random().toString(36).substring(7)}`,
//       meta_title: metaTitle,
//       meta_description: metaDescription,
//       logo,
//     },
//   });

//   await prisma.brand_translations.create({
//     data: {
//       lang: process.env.DEFAULT_LANGUAGE || 'en',
//       name,
//       brand_id: brand.id,
//     },
//   });

//   return brand;
// }

// Utility function to generate slugs
function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createOrUpdateBrand(data: createOrUpdateData) {
  try {
    // Generate a slug
    const slug = generateSlug(data.name);
    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    // Perform the upsert operation
    const newCategory = await prisma.brands.upsert({
      where: { id: data.id || 0, slug: slug }, // Replace `0` with a non-zero ID if necessary
      update: {
        name: data.name,
        slug: slug,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        logo: data.logo,
        updated_at: created_at,
      },
      create: {
        name: data.name,
        slug: slug,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        logo: data.logo,
        created_at: created_at,
      },
    });

    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Error creating or updating blog category:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}

// export async function updateBrand(id: number, name: string, metaTitle: string, metaDescription: string, slug: string | null, logo: string | null, lang: string) {
//   const brand = await prisma.brands.update({
//     where: { id },
//     data: {
//       name,
//       meta_title: metaTitle,
//       meta_description: metaDescription,
//       slug: slug || `${name.replace(/\s+/g, '-').replace(/[^A-Za-z0-9\-]/g, '')}-${Math.random().toString(36).substring(7)}`,
//       logo,
//       translations: {
//         upsert: {
//           where: { lang_brand_id: { lang, brand_id: id } },
//           update: { name },
//           create: { lang, name },
//         },
//       },
//     },
//   });

//   return brand;
// }

export async function deleteBrand(id: number) {
  // Delete products associated with the brand
  await prisma.products.deleteMany({ where: { brand_id: id } });

  // Delete brand translations
  await prisma.brand_translations.deleteMany({ where: { brand_id: id } });

  // Delete the brand
  await prisma.brands.delete({ where: { id } });
}

// export const deleteBrand = async (id: number) => {
//   try {
//     // Check if the record exists
//     const existingblogs = await prisma.blogs.findUnique({
//       where: { id },
//     });

//     if (!existingblogs) {
//       return { success: false, error: "Record does not exist." };
//     }

//     const deletedblog = await prisma.blogs.delete({
//       where: { id },
//     });
//     return { success: true, data: deletedblog };
//   } catch (error) {
//     console.error("Error deleting blog:", error);
//     return { success: false, error };
//   }
// };