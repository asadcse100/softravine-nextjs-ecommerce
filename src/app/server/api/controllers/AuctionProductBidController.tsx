// api/auctionProductBid/index.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
import { AuctionProductBid, Product } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return handleIndex(req, res);
  } else if (req.method === 'POST') {
    return handleStore(req, res);
  } else if (req.method === 'DELETE') {
    return handleDestroy(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleIndex(req: NextApiRequest, res: NextApiResponse) {
  const userId = 1; // Replace with actual user id
  try {
    const bids = await prisma.auctionProductBid.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
      },
      distinct: ['id'],
      take: 10,
    });
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleStore(req: NextApiRequest, res: NextApiResponse) {
  const { product_id, amount } = req.body;
  const userId = 1; // Replace with actual user id
  try {
    let bid = await prisma.auctionProductBid.findFirst({
      where: {
        productId: product_id,
        userId,
      },
    });

    if (!bid) {
      bid = await prisma.auctionProductBid.create({
        data: {
          userId,
          productId: product_id,
          amount,
        },
      });
    } else {
      bid = await prisma.auctionProductBid.update({
        where: {
          id: bid.id,
        },
        data: {
          amount,
        },
      });
    }

    res.status(200).json({ success: true, bid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Something went wrong!' });
  }
}

async function handleDestroy(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    await prisma.auctionProductBid.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ success: true, message: 'Bid deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Something went wrong!' });
  }
}
