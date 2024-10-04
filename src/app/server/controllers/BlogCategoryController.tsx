// controllers/blogCategoryController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export async function getBlogCategories(search: string | null = null) {
//   if (search) {
//     return prisma.blog_categories.findMany({
//       where: { category_name: { contains: search, mode: 'insensitive' } },
//       orderBy: { category_name: 'asc' },
//     });
//   } else {
//     return prisma.blog_categories.findMany({
//       orderBy: { category_name: 'asc' },
//     });
//   }
// }

export const getBlogCategories = async () => {
  try {
    const blog_categories = await prisma.blog_categories.findMany();    
    return { success: true, data: blog_categories };
  } catch (error) {
    console.error("Error fetching blog_categories:", error);
    return { success: false, error };
  }
}

export async function createBlogCategory(categoryName: string) {
  const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return prisma.blogCategory.create({
    data: {
      categoryName,
      slug,
    },
  });
}

export async function updateBlogCategory(id: number, categoryName: string) {
    const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
    return prisma.blogCategory.update({
      where: { id },
      data: {
        categoryName,
        slug,
      },
    });
  }

  export async function deleteBlogCategory(id: number) {
    return prisma.blogCategory.delete({
      where: { id },
    });
  }