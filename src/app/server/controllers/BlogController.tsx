
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  title: string;
  category_id: number;
  banner: number;
  short_description: string;
  description: string;
  meta_title?: string;
  meta_img?: any;
  meta_description?: string;
  meta_keywords?: string;
  status: string;
  created_at: string;
};

export const selectCategories = async () => {
  try {
    const blog_categories = await prisma.blog_categories.findMany({
      select: {
        category_name: true,
      },
    });
    return { success: true, data: blog_categories };

  } catch (error) {
    return { success: false, error };
  }
}

export const getBlogById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.blog_categories.findUnique({
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

export async function getBlogs(search: string | null = null) {
  const where = search
    ? { title: { contains: search, mode: 'insensitive' } }
    : {};

  return prisma.blogs.findMany({
    where,
    orderBy: { created_at: 'desc' },
  });
}

// Utility function to generate slugs
function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createOrUpdateBlogPost(data: createOrUpdateData) {
  try {
    // Generate a slug
    const slug = generateSlug(data.title);
    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    // Perform the upsert operation
    const newCategory = await prisma.blogs.upsert({
      where: { id: data.id || 0, slug: slug }, // Replace `0` with a non-zero ID if necessary
      update: {
        category_id: data.category_id,
        title: data.title,
        banner: data.banner,
        slug: slug,
        short_description: data.short_description,
        description: data.description,
        meta_title: data.meta_title,
        meta_img: data.meta_img,
        meta_description: data.meta_description,
        meta_keywords: data.meta_keywords,
        updated_at: created_at,
      },
      create: {
        category_id: data.category_id,
        title: data.title,
        banner: data.banner,
        slug: slug,
        short_description: data.short_description,
        description: data.description,
        meta_title: data.meta_title,
        meta_img: data.meta_img,
        meta_description: data.meta_description,
        meta_keywords: data.meta_keywords,
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

export async function changeBlogPostStatus(id: number, status: string) {
  return prisma.blogs.update({
    where: { id },
    data: { status },
  });
}

// export async function deleteBlogPost(id: number) {
//   return prisma.blogs.delete({
//     where: { id },
//   });
// }

export const deleteBlogPost = async (id: number) => {
  try {
    // Check if the record exists
    const existingblogs = await prisma.blogs.findUnique({
      where: { id },
    });

    if (!existingblogs) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedblog = await prisma.blogs.delete({
      where: { id },
    });
    return { success: true, data: deletedblog };
  } catch (error) {
    // console.error("Error deleting blog:", error);
    return { success: false, error };
  }
};

export const getAllBlogs = async () => {
  try {
    const blogs = await prisma.blogs.findMany();

    return { success: true, data: blogs };
  } catch (error) {
    // console.error("Error fetching blogs:", error);
    return { success: false, error };
  }
}

export async function getBlogDetails(slug: string) {
  return prisma.blogs.findUnique({
    where: { slug },
    include: { /* Include any related models if needed */ },
  });
}

export async function getRecentBlogs() {
  return prisma.blogs.findMany({
    where: { status: 1 },
    orderBy: { created_at: 'desc' },
    take: 9,
  });
}