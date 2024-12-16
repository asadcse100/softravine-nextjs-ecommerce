import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  type: string;
  value: string;
};

export const addToCompare = async (req: NextApiRequest, res: NextApiResponse) => {
  const { productId, userId } = req.body;

  if (!productId || !userId) {
    return res.status(400).json({ error: 'Product ID and User ID are required' });
  }

  // Fetch the compare list from the database
  const compareList = await prisma.compares.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' }
  });

  if (compareList.length >= 3) {
    // If there are already 3 items, remove the oldest one
    const oldestItem = compareList[0];
    await prisma.compares.delete({
      where: { id: oldestItem.id }
    });
  }

  // Add the new item to the compare list
  await prisma.compares.create({
    data: {
      productId,
      userId
    }
  });

  const updatedCompareList = await prisma.compares.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' }
  });

  res.status(200).json(updatedCompareList);
};


export const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const categories = await prisma.categories.findMany();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  };