import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

// export const getMyBiddedProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  export const getMyBiddedProducts = async () => {
  const session = await getSession({ req });
  if (!session) {
    // return res.status(401).json({ error: 'Unauthorized' });
    console.error("Unauthorized", error);
    return { success: false, error };
  }

  const userId = session.user.id;

  try {
    const bids = await prisma.auctionProductBid.findMany({
      where: { userId: userId },
      orderBy: { id: 'desc' },
      distinct: ['id'],
      include: {
        product: true
      },
      take: 20 // For pagination purposes, you can adjust as needed
    });

    // res.status(200).json({ bids });
    return { success: true, data: bids };
  } catch (error) {
    console.error("Error fetching bids:", error);
    return { success: false, error };
  }
};


export const placeBid = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user_id = session.users.id;
  const { product_id, amount } = req.body;

  try {
    let bid = await prisma.auction_product_bids.findFirst({
      where: {
        product_id: product_id,
        user_id: user_id
      }
    });

    if (!bid) {
      bid = await prisma.auction_product_bids.create({
        data: {
          user_id: user_id,
          product_id: product_id,
          amount: amount
        }
      });
    } else {
      bid = await prisma.auction_product_bids.update({
        where: {
          id: bid.id
        },
        data: {
          amount: amount
        }
      });
    }

    res.status(200).json({ message: 'Bid Placed Successfully', bid });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
};


export const showProductWithBids = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const product = await prisma.products.findUnique({
      where: { id: parseInt(id as string) },
      include: {
        auction_product_bids: {
          orderBy: {
            created_at: 'desc'
          }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ product, bids: product.auction_product_bids });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};