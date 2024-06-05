// controllers/blogController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getBlogs(search: string | null = null) {
  const where = search
    ? { title: { contains: search, mode: 'insensitive' } }
    : {};

  return prisma.blog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
}

export async function createBlogPost(data: any) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
    return prisma.blog.create({
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

  export async function updateBlogPost(id: number, data: any) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
    return prisma.blog.update({
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
    return prisma.blog.update({
      where: { id },
      data: { status },
    });
  }

  export async function deleteBlogPost(id: number) {
    return prisma.blog.delete({
      where: { id },
    });
  }

  export async function getAllBlogs(selectedCategories: string[], search: string | null): Promise<Blog[]> {
    const where: {
      status: boolean;
      AND?: Array<
        | {
            OR: Array<{ title?: { contains: string; mode: 'insensitive' }; short_description?: { contains: string; mode: 'insensitive' } }>;
          }
        | { category_id: { in: number[] } }
      >;
    } = {
      status: true,
      AND: [],
    };
  
    if (search) {
      where.AND?.push({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { short_description: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
  
    if (selectedCategories.length > 0) {
      const blogCategories: Array<{ id: number }> = await prisma.blogCategory.findMany({
        where: { slug: { in: selectedCategories } },
        select: { id: true },
      });
  
      const categoryIds = blogCategories.map(category => category.id);
  
      if (categoryIds.length > 0) {
        where.AND?.push({ category_id: { in: categoryIds } });
      }
    }
  
    if (where.AND?.length === 0) {
      delete where.AND;
    }
  
    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: { category: true },
    });
  
    return blogs;
  }

  export async function getBlogDetails(slug: string) {
    return prisma.blog.findUnique({
      where: { slug },
      include: { /* Include any related models if needed */ },
    });
  }
  
  export async function getRecentBlogs() {
    return prisma.blog.findMany({
      where: { status: true },
      orderBy: { created_at: 'desc' },
      take: 9,
    });
  }