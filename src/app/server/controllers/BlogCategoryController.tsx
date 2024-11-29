import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getBlogCategories = async () => {
  try {
    const blogCategories = await prisma.blog_categories.findMany({
      orderBy: {
        created_at: "desc", // Replace 'created_at' with your column name
      },
    });
    return { success: true, data: blogCategories };
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return { success: false, error };
  }
};

export const createBlogCategory = async (category_name: string) => {
  try {
    // Generate a slug by converting the category name to lowercase and formatting it
    const slug = category_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Use the current date as-is if `created_at` is a Date type in Prisma
    const created_at = new Date();

    // Create a new category in the database
    const newCategory = await prisma.blog_categories.create({
      data: {
        category_name,
        slug,
        created_at,
      },
    });

    return { success: true, data: newCategory };
  } catch (error) {
    console.error("Error creating new category:", error);
    return { success: false, error };
  }
};

export const updateBlogCategory = async (id: number, category_name: string) => {
  try {
    const slug = category_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const updatedCategory = await prisma.blog_categories.update({
      where: { id },
      data: {
        category_name,
        slug,
      },
    });
    return { success: true, data: updatedCategory };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error };
  }
};

export const deleteBlogCategory = async (id: number) => {
  try {
    const deletedCategory = await prisma.blog_categories.delete({
      where: { id },
    });
    return { success: true, data: deletedCategory };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error };
  }
};
