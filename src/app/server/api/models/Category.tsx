// models/Category.ts
import { PrismaClient, Category as CategoryModel } from '@prisma/client';

const prisma = new PrismaClient();

export interface Category {
  id: number;
  name: string;
  // Define other fields here
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

export async function createCategory(data: Category): Promise<Category> {
  return await prisma.category.create({
    data,
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
