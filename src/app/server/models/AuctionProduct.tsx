import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id }
  });
};

export const updateProduct = async (id: number, data: any) => {
  return await prisma.product.update({
    where: { id },
    data
  });
};

// Add more methods as needed
