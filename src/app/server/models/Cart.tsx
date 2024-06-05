// models/Cart.ts
import { PrismaClient, User, Address, Product } from '@prisma/client';

const prisma = new PrismaClient();

export interface Cart {
  id: number;
  addressId: number;
  price: number;
  tax: number;
  shippingCost: number;
  discount: number;
  productReferralCode: string;
  couponCode: string;
  couponApplied: boolean;
  quantity: number;
  userId: number;
  tempUserId: number;
  ownerId: number;
  productId: number;
  variation: string;
}

export async function getCartById(id: number): Promise<Cart | null> {
  return await prisma.cart.findUnique({
    where: { id },
    include: {
      user: true,
      address: true,
      product: true,
    },
  });
}

export async function createCart(data: Cart): Promise<Cart> {
  return await prisma.cart.create({
    data,
  });
}

export async function updateCart(id: number, data: Partial<Cart>): Promise<Cart | null> {
  return await prisma.cart.update({
    where: { id },
    data,
  });
}

export async function deleteCart(id: number): Promise<Cart | null> {
  return await prisma.cart.delete({
    where: { id },
  });
}
