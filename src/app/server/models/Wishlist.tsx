// models/Wishlist.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Wishlist {
  id: number;
  orderId: number;
  // Define other fields here
}

export async function getWishlistById(id: number): Promise<Wishlist | null> {
  return await prisma.Wishlist.findUnique({
    where: { id },
    include: {
      order: true,
    },
  });
}

export async function createWishlist(data: Wishlist): Promise<Wishlist> {
  return await prisma.Wishlist.create({
    data,
  });
}

export async function updateWishlist(id: number, data: Partial<Wishlist>): Promise<Wishlist | null> {
  return await prisma.Wishlist.update({
    where: { id },
    data,
  });
}

export async function deleteWishlist(id: number): Promise<Wishlist | null> {
  return await prisma.Wishlist.delete({
    where: { id },
  });
}
