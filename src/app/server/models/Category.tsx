// models/Category.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Category {
  id: number;
  name: string;
  order_level: number;
  digital: boolean;
  banner: string;
  icon: string;
  cover_image: string;
  meta_title: string;
  meta_description: string;
  parent_id?: number;
  level?: number;
  slug: string;
  commision_rate?: number;
}

export async function createCategory(categoryData: Category): Promise<Category> {
  return await prisma.category.create({
    data: categoryData,
  });
}

export async function getCategoryById(id: number): Promise<Category | null> {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      category_translations: true,
      coverImage: true,
      catIcon: true,
      bannerImage: true,
      classified_products: true,
      categories: true,
      childrenCategories: {
        include: {
          categories: true,
        },
      },
      parentCategory: true,
      attributes: true,
    },
  });
}

export async function updateCategory(id: number, data: Partial<Category>): Promise<Category | null> {
  return await prisma.category.update({
    where: { id },
    data,
  });
}

export async function deleteCategory(id: number): Promise<Category | null> {
  return await prisma.category.delete({
    where: { id },
  });
}
