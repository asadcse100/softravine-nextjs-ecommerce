// models/CartProduct.ts
import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

export interface CartProduct {
  id: number;
  productId: number;
  // Define other fields here
}

export async function getCartProductById(id: number): Promise<CartProduct | null> {
  return await prisma.cartProduct.findUnique({
    where: { id },
    include: {
      product: true,
    },
  });
}

export async function createCartProduct(data: CartProduct): Promise<CartProduct> {
  return await prisma.cartProduct.create({
    data,
  });
}

export async function updateCartProduct(id: number, data: Partial<CartProduct>): Promise<CartProduct | null> {
  return await prisma.cartProduct.update({
    where: { id },
    data,
  });
}

export async function deleteCartProduct(id: number): Promise<CartProduct | null> {
  return await prisma.cartProduct.delete({
    where: { id },
  });
}
