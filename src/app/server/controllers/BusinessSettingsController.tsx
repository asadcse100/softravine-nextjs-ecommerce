import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  category_name: string;
  created_at?: string;
};

export const updateFacebookChatSetting = async (id: number) => {
  try {
    // Check if the record exists
    const businessSetting = await prisma.business_settings.findFirst({
        where: {
            type: 'facebook_chat',
          },
    });

    if (!businessSetting) {
      return { success: false, error: "Record does not exist." };
    }

    // const deletedCategory = await prisma.blog_categories.delete({
    //   where: { id },
    // });
    return { success: true, data: businessSetting };
  } catch (error) {
    // console.error("Error category:", error);
    return { success: false, error };
  }
};

export const getBlogCategories = async () => {
  try {
    const blogCategories = await prisma.blog_categories.findMany({
      orderBy: {
        created_at: "desc", // Replace 'created_at' with your column name
      },
    });
    return { success: true, data: blogCategories };
  } catch (error) {
    // console.error("Error fetching blog categories:", error);
    return { success: false, error };
  }
};

export async function createOrUpdateBlogCategory(id = null, data: createOrUpdateData) {
  try {
    // Validate that category_name exists
    if (!data.category_name) {
      throw new Error("Category name is required");
    }

    // Generate a slug
    const slug = data.category_name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    // Perform the upsert operation
    const newCategory = await prisma.blog_categories.upsert({
      where: { id: id || 0 }, // Replace `0` with a non-zero ID if necessary
      update: {
        category_name: data.category_name,
        slug: slug,
        updated_at: created_at,
      },
      create: {
        category_name: data.category_name,
        slug: slug,
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

export const deleteBlogCategory = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.blog_categories.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedCategory = await prisma.blog_categories.delete({
      where: { id },
    });
    return { success: true, data: deletedCategory };
  } catch (error) {
    // console.error("Error deleting category:", error);
    return { success: false, error };
  }
};
