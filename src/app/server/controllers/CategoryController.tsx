// controllers/categoryController.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  parent_id: number;
  level: number;
  name: string;
  order_level: number;
  commision_rate: number;
  banner: string;
  icon: string;
  cover_image: string;
  featured: number;
  top: number;
  digital: number;
  slug: string;
  meta_title: string;
  meta_description: string;
  created_at?: string;
};

export const selectCategories = async () => {
  try {
    const categories = await prisma.categories.findMany({
      select: {
        name: true,
      },
    });
    return { success: true, data: categories };

  } catch (error) {
    // console.error("Error fetching categorys:", error);
    return { success: false, error };
  }
}

export const getCategoryById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.categories.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    // console.error("Error category:", error);
    return { success: false, error };
  }
};

export const getCategories = async () => {
  try {
    const categories = await prisma.categories.findMany();
    return { success: true, data: categories };
  } catch (error) {
    // console.error("Error fetching categories:", error);
    return { success: false, error };
  }
}

// Utility function to generate slugs
function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createOrUpdateCategory(data: createOrUpdateData) {
  try {

        // Calculate category level based on parent_id
        let level = 0;
        if (data.parent_id) {
          const parentCategory = await prisma.categories.findUnique({
            where: { id: data.parent_id },
          });
          level = parentCategory ? parentCategory.level + 1 : 0;
        }
    
        // Set default order_level if not provided
        const orderLevel = data.order_level || 0;
        
    // Generate a slug
    const slug = generateSlug(data.name);
    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    // Perform the upsert operation
    const newCategory = await prisma.categories.upsert({
      where: { id: data.id || 0, slug: slug }, // Replace `0` with a non-zero ID if necessary
      update: {
        name: data.name,
        parent_id: data.parent_id,
        level: data.level,
        slug: slug,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        order_level: data.order_level,
        commision_rate: data.commision_rate,
        banner: data.banner,
        icon: data.icon,
        cover_image: data.cover_image,
        featured: data.featured,
        top: data.top,
        digital: data.digital,
        updated_at: created_at,
      },
      create: {
        name: data.name,
        parent_id: data.parent_id,
        level: data.level,
        slug: slug,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        order_level: data.order_level,
        commision_rate: data.commision_rate,
        banner: data.banner,
        icon: data.icon,
        cover_image: data.cover_image,
        featured: data.featured,
        top: data.top,
        digital: data.digital,
        created_at: created_at,
      },
    });

    return { success: true, data: newCategory };
  } catch (error) {
    return { success: false, error };
    // console.error("Error creating or updating blog category:", error);
    // return { success: false, message: "An unexpected error occurred" };
  }
}

export const deleteCategory = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategorys = await prisma.categories.findUnique({
      where: { id },
    });

    if (!existingCategorys) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedCategorys = await prisma.categories.delete({
      where: { id },
    });
    return { success: true, data: deletedCategorys };
  } catch (error) {
    // console.error("Error deleting Categorys:", error);
    return { success: false, error };
  }
};