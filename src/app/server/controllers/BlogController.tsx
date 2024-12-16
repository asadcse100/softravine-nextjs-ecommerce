
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  title: string;
  category_id: number;
  banner: number;
  short_description: string;
  description: string;
  meta_title?: string;
  meta_img?: any;
  meta_description?: string;
  meta_keywords?: string;
  status: number;
  created_at: string;
};

export const selectCategories = async () => {
  try{
      const blog_categories = await prisma.blog_categories.findMany({
        select: {
          category_name: true,
        },
    });
    return { success: true, data: blog_categories };

  }catch(error){
      return { success: false, error };
  }
}

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
    const slug = generateSlug(data.title);

    const newPost = await prisma.blogs.create({
      data: {
        category_id: 1,
        title: data.title,
        banner: data.banner,
        slug,
        short_description: data.short_description,
        description: data.description,
        meta_title: data.meta_title,
        meta_img: data.meta_img,
        meta_description: data.meta_description,
        meta_keywords: data.meta_keywords,
      },
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
}

export async function updateBlogPost(id: number, data: any) {
  const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return prisma.blogs.update({
    where: { id },
    data: {
      category: { connect: { id: data.category_id } },
      title: data.title,
      banner: data.banner,
      slug,
      short_description: data.short_description,
      description: data.description,
      meta_title: data.meta_title,
      meta_img: data.meta_img,
      meta_description: data.meta_description,
      meta_keywords: data.meta_keywords,
    },
  });
}

export async function changeBlogPostStatus(id: number, status: string) {
  return prisma.blogs.update({
    where: { id },
    data: { status },
  });
}

export async function deleteBlogPost(id: number) {
  return prisma.blogs.delete({
    where: { id },
  });
}

export const getAllBlogs = async () => {
  try {
    const blogs = await prisma.blogs.findMany();
    
    return { success: true, data: blogs };
  } catch (error) {
    console.error("Error fetching blogs:", error);
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
    where: { status: true },
    orderBy: { created_at: 'desc' },
    take: 9,
  });
}