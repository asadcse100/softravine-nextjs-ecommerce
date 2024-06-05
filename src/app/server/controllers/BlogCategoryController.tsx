// controllers/blogCategoryController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getBlogCategories(search: string | null = null) {
  if (search) {
    return prisma.blogCategory.findMany({
      where: { categoryName: { contains: search, mode: 'insensitive' } },
      orderBy: { categoryName: 'asc' },
    });
  } else {
    return prisma.blogCategory.findMany({
      orderBy: { categoryName: 'asc' },
    });
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