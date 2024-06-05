// controllers/followedSellersController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFollowedSellers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to attach user to request
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const followedSellers = await prisma.followSeller.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        shopId: 'asc',
      },
      include: {
        shop: true, // Assuming there's a relation to the shop model
      },
    });

    res.status(200).json(followedSellers);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const followSellerController = {
  async store(req: NextApiRequest, res: NextApiResponse) {
    try {
      // Assuming user is attached to the request
      const userId = req.user.id;
      const { id: shopId } = req.body;

      if (!userId) {
        return res.status(401).json({ message: 'You need to login as a customer to follow this seller' });
      }

      const followedSeller = await prisma.followSeller.findFirst({
        where: {
          userId,
          shopId,
        },
      });

      if (!followedSeller) {
        await prisma.followSeller.create({
          data: {
            userId,
            shopId,
          },
        });
      }

      res.status(200).json({ message: 'Seller is followed Successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async remove(req: NextApiRequest, res: NextApiResponse) {
    try {
      const userId = req.user.id; // Assuming you have middleware to attach user to request
      const { id: shopId } = req.body;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const followedSeller = await prisma.followSeller.findFirst({
        where: {
          userId,
          shopId,
        },
      });

      if (followedSeller) {
        await prisma.followSeller.deleteMany({
          where: {
            userId,
            shopId,
          },
        });
        res.status(200).json({ message: 'Seller is unfollowed Successfully' });
      } else {
        res.status(404).json({ message: 'Followed seller not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

