// models/AuctionProductBid.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuctionProductBid {
  id: number;
  productId: number;
  userId: number;
  // Define other fields here
}

export async function getAuctionProductBidById(id: number): Promise<AuctionProductBid | null> {
  return await prisma.auctionProductBid.findUnique({
    where: { id },
    include: {
      product: true,
      user: true,
    },
  });
}

export async function createAuctionProductBid(data: AuctionProductBid): Promise<AuctionProductBid> {
  return await prisma.auctionProductBid.create({
    data,
  });
}

export async function updateAuctionProductBid(id: number, data: Partial<AuctionProductBid>): Promise<AuctionProductBid | null> {
  return await prisma.auctionProductBid.update({
    where: { id },
    data,
  });
}

export async function deleteAuctionProductBid(id: number): Promise<AuctionProductBid | null> {
  return await prisma.auctionProductBid.delete({
    where: { id },
  });
}
