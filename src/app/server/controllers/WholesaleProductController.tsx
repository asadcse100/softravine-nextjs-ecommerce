import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export async function getAllWholesaleProducts(req: NextApiRequest, res: NextApiResponse) {
  const { user_id, type, search } = req.query;

  try {
    let products = await prisma.product.findMany({
      where: {
        wholesaleProduct: true,
        ...(user_id && { userId: Number(user_id) }),
        ...(search && { name: { contains: search as string, mode: 'insensitive' } }),
      },
      orderBy: type
        ? {
            [type.split(",")[0]]: type.split(",")[1] as 'asc' | 'desc',
          }
        : { createdAt: 'desc' },
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getInHouseWholesaleProducts(req: NextApiRequest, res: NextApiResponse) {
    const { type, search } = req.query;
  
    try {
      let orderBy: any = { createdAt: 'desc' };
      if (type) {
        const [col_name, query] = (type as string).split(',');
        orderBy = { [col_name]: query };
      }
  
      const products = await prisma.product.findMany({
        where: {
          wholesaleProduct: true,
          addedBy: 'admin',
          ...(search && { name: { contains: search as string, mode: 'insensitive' } }),
        },
        orderBy,
      });
  
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  export async function getSellerWholesaleProducts(req: NextApiRequest, res: NextApiResponse) {
    const { user_id, type, search } = req.query;
  
    try {
      let orderBy: any = { createdAt: 'desc' };
      if (type) {
        const [col_name, query] = (type as string).split(',');
        orderBy = { [col_name]: query };
      }
  
      const products = await prisma.product.findMany({
        where: {
          wholesaleProduct: true,
          addedBy: 'seller',
          ...(user_id && { userId: Number(user_id) }),
          ...(search && { name: { contains: search as string, mode: 'insensitive' } }),
        },
        orderBy,
      });
  
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }


  export async function getForSellerWholesaleProducts(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
  
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const { type, search } = req.query;
    const userId = session.user.id;
  
    try {
      let orderBy: any = { createdAt: 'desc' };
      if (type) {
        const [col_name, query] = (type as string).split(',');
        orderBy = { [col_name]: query };
      }
  
      const products = await prisma.product.findMany({
        where: {
          wholesaleProduct: true,
          userId,
          ...(search && { name: { contains: search as string, mode: 'insensitive' } }),
        },
        orderBy,
      });
  
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }


  export async function getCategories(req: NextApiRequest, res: NextApiResponse) {
    try {
      const categories = await prisma.category.findMany({
        where: {
          parentId: 0,
          digital: false,
        },
        include: {
          childrenCategories: true,
        },
      });
  
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }


  export async function getCategoriesForSeller(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
  
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const userId = session.user.id;
  
    try {
      const categories = await prisma.category.findMany({
        where: {
          parentId: 0,
          digital: false,
        },
        include: {
          childrenCategories: true,
        },
      });
  
      const seller = await prisma.seller.findUnique({
        where: { userId },
        include: { sellerPackage: true, user: { include: { products: true } } },
      });
  
      const uploadLimitReached = seller?.sellerPackage?.productUploadLimit <= seller?.user?.products?.length;
  
      return res.status(200).json({ categories, uploadLimitReached });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }