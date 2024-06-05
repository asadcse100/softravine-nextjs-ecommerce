// models/BlogCategory.ts
import { PrismaClient, Blog } from '@prisma/client';

const prisma = new PrismaClient();

export interface BlogCategory {
  id: number;
  // Define other fields here
}

export async function getBlogCategoryById(id: number): Promise<BlogCategory | null> {
  return await prisma.blogCategory.findUnique({
    where: { id },
    include: {
      posts: true,
    },
  });
}

export async function createBlogCategory(data: BlogCategory): Promise<BlogCategory> {
  return await prisma.blogCategory.create({
    data,
  });
}

export async function updateBlogCategory(id: number, data: Partial<BlogCategory>): Promise<BlogCategory | null> {
  return await prisma.blogCategory.update({
    where: { id },
    data,
  });
}

export async function deleteBlogCategory(id: number): Promise<BlogCategory | null> {
  return await prisma.blogCategory.delete({
    where: { id },
  });
}
