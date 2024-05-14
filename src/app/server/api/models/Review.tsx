// models/Review.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Review {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getReviewById(id: number): Promise<Review | null> {
  return await prisma.Review.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createReview(data: Review): Promise<Review> {
  return await prisma.Review.create({
    data,
  });
}

export async function updateReview(id: number, data: Partial<Review>): Promise<Review | null> {
  return await prisma.Review.update({
    where: { id },
    data,
  });
}

export async function deleteReview(id: number): Promise<Review | null> {
  return await prisma.Review.delete({
    where: { id },
  });
}
