// controllers/categoryController.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createCategory } from '../models/Category';

const prisma = new PrismaClient();

// export async function getCategories(search?: string) {
//   const categories = await prisma.category.findMany({
//     where: search ? { name: { contains: search, mode: 'insensitive' } } : {},
//     orderBy: { orderLevel: 'desc' },
//   });

//   return categories;
// }

export const selectCategories = async () => {
      try{
        const categories = await prisma.categories.findMany({
          select: {
              name: true,
          },
      });
      return { success: true, data: categories };

  }catch(error){
      console.error("Error fetching categorys:", error);
      return { success: false, error };
  }
}

export const getCategories = async () => {
  try{
      const categories = await prisma.categories.findMany();
      return { success: true, data: categories };
  }catch(error){
      console.error("Error fetching categories:", error);
      return { success: false, error };
  }
}

export default async function store(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      try {
        const categoryData = req.body;
        const category = await createCategory(categoryData);
        res.status(201).json({ success: true, category });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  }