import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface Category {
  id: number;
  level: number;
  // Other category properties
}

interface Product {
  id: number;
  num_of_sale: number;
  category_id: number;
  // Other product properties
}

interface Stock {
  id: number;
  qty: number;
  // Other stock properties
}

export default async function adminDashboard(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rootCategories: Category[] = await prisma.category.findMany({
      where: {
        level: 0
      }
    });

    const cachedGraphData = await getCachedGraphData(rootCategories);

    res.status(200).json({ rootCategories, cachedGraphData });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getCachedGraphData(rootCategories: Category[]) {
  try {
    const cachedData = await prisma.cache.findUnique({
      where: {
        id: 'cached_graph_data'
      }
    });

    if (cachedData) {
      return cachedData.data;
    } else {
      let num_of_sale_data = '';
      let qty_data = '';

      for (const category of rootCategories) {
        const categoryIds = await getCategoryIds(category.id);
        categoryIds.push(category.id);

        const products: Product[] = await prisma.product.findMany({
          where: {
            category_id: { in: categoryIds }
          },
          include: {
            stocks: true
          }
        });

        let qty = 0;
        let sale = 0;

        for (const product of products) {
          sale += product.num_of_sale;

          for (const stock of product.stocks) {
            qty += stock.qty;
          }
        }

        qty_data += qty + ',';
        num_of_sale_data += sale + ',';
      }

      const cachedData = await prisma.cache.create({
        data: {
          id: 'cached_graph_data',
          data: { num_of_sale_data, qty_data }
        }
      });

      return cachedData.data;
    }
  } catch (error) {
    throw new Error('Error getting cached graph data');
  }
}

async function getCategoryIds(categoryId: number): Promise<number[]> {
  const categories = await prisma.category.findMany({
    where: {
      parent_id: categoryId
    },
    select: {
      id: true
    }
  });

  const categoryIds = categories.map(category => category.id);

  for (const category of categories) {
    const childCategoryIds = await getCategoryIds(category.id);
    categoryIds.push(...childCategoryIds);
  }

  return categoryIds;
}
