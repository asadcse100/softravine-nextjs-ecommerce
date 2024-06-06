// controllers/ReviewController.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getReviews(req: NextApiRequest, res: NextApiResponse) {
  try {
    let reviews = await prisma.review.findMany({
      orderBy: { created_at: 'desc' },
    });

    if (req.query.rating) {
      const [order, direction] = (req.query.rating as string).split(',');
      reviews = reviews.sort((a, b) => {
        if (direction === 'asc') {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function createReview(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { product_id, rating, comment, photos } = req.body;
      const userId = req.session.userId; // Assuming you're using session-based authentication
  
      const review = await prisma.review.create({
        data: {
          product_id,
          user_id: userId,
          rating,
          comment,
          photos: photos.join(','),
          viewed: false,
        },
      });
  
      // Update product rating
      const product = await prisma.product.update({
        where: { id: product_id },
        data: {
          rating: await prisma.review.aggregate({
            _avg: { rating: true },
            where: { product_id, status: 1 },
          })._avg.rating || 0,
        },
      });
  
      // Update seller rating if applicable
      if (product.added_by === 'seller') {
        const seller = await prisma.shop.update({
          where: { user_id: product.user_id },
          data: {
            rating: await prisma.review.aggregate({
              _avg: { rating: true },
              where: { product: { user_id: product.user_id }, status: 1 },
            })._avg.rating || 0,
            num_of_reviews: {
              increment: 1,
            },
          },
        });
      }
  
      res.status(201).json({ review, message: 'Review submitted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  export async function updatePublished(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { id, status } = req.body;
  
      const review = await prisma.review.update({
        where: { id: Number(id) },
        data: { status: Boolean(status) },
      });
  
      const product = await prisma.product.update({
        where: { id: review.product_id },
        data: {
          rating: await prisma.review.aggregate({
            _avg: { rating: true },
            where: { product_id: review.product_id, status: true },
          })._avg.rating || 0,
        },
      });
  
      if (product.added_by === 'seller') {
        const seller = await prisma.shop.update({
          where: { user_id: product.user_id },
          data: {
            rating: await prisma.review.aggregate({
              _avg: { rating: true },
              where: { product: { user_id: product.user_id }, status: true },
            })._avg.rating || 0,
            num_of_reviews: {
              [status ? 'increment' : 'decrement']: 1,
            },
          },
        });
      }
  
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }