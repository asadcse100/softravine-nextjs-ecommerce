// controllers/categoryController.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { createCategory } from '../models/Category';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  parent_id: number;
  level: number;
  name: string;
  order_level: number;
  commision_rate: number;
  banner: string;
  icon: string;
  cover_image: string;
  featured: number;
  top: number;
  digital: number;
  slug: string;
  meta_title: string;
  meta_description: string;
  created_at?: string;
};

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

export default async function createOrUpdateCategory() {
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