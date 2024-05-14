// models/Blog.ts
import { PrismaClient, BlogCategory } from '@prisma/client';

const prisma = new PrismaClient();

export interface Blog {
  id: number;
  categoryId: number;
  // Define other fields here
}

export async function getBlogById(id: number): Promise<Blog | null> {
  return await prisma.blog.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}

export async function createBlog(data: Blog): Promise<Blog> {
  return await prisma.blog.create({
    data,
  });
}

export async function updateBlog(id: number, data: Partial<Blog>): Promise<Blog | null> {
  return await prisma.blog.update({
    where: { id },
    data,
  });
}

export async function deleteBlog(id: number): Promise<Blog | null> {
  return await prisma.blog.delete({
    where: { id },
  });
}
