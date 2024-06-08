import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function index(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const userId = req.query.userId as string;
    try {
      const products = await prisma.product.findMany({
        where: { userId: parseInt(userId), digital: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}

export async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Check seller subscription
      if (addon_is_activated('seller_subscription')) {
        if (!seller_package_validity_check()) {
          return res.status(200).json({ message: 'Please upgrade your package.' });
        }
      }
      
      // Fetch categories
      const categories = await prisma.category.findMany({
        where: { parentId: 0, digital: true },
        include: {
          childrenCategories: true,
        },
      });

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).end(); // Method Not Allowed
}

export default async function store(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'POST') {
      try {
        // Check seller subscription
        if (addon_is_activated('seller_subscription')) {
          if (!seller_package_validity_check()) {
            return res.status(400).json({ message: 'Please upgrade your package.' });
          }
        }
  
        // Product Store
        const productData = req.body; // Assuming product data is sent in the request body
        const product = await prisma.product.create({
          data: productData,
        });
  
        // Product Stock
        await prisma.productStock.create({
          data: {
            product: { connect: { id: product.id } },
            unitPrice: productData.unit_price,
            qty: 0,
          },
        });
  
        // Product Translation
        await prisma.productTranslation.create({
          data: {
            lang: process.env.DEFAULT_LANGUAGE, // Assuming DEFAULT_LANGUAGE is defined in environment variables
            name: productData.name,
            description: productData.description,
            product: { connect: { id: product.id } },
          },
        });
  
        // Product categories
        await Promise.all(
          productData.category_ids.map((categoryId: number) =>
            prisma.productCategory.create({
              data: {
                product: { connect: { id: product.id } },
                category: { connect: { id: categoryId } },
              },
            })
          )
        );
  
        // Notify admin
        const users = await prisma.user.findMany({
          where: {
            OR: [{ id: parseInt(req.user.id) }, { userType: 'admin' }],
          },
        });
  
        // Assuming get_setting and Notification are also handled by Prisma
        // Implement accordingly if not
        if (get_setting('product_approve_by_admin') == 1) {
          await Promise.all(
            users.map((user) =>
              prisma.notification.create({
                data: {
                  recipientId: user.id,
                  type: 'digital',
                  productId: product.id,
                },
              })
            )
          );
        }
  
        return res.status(201).json({ message: 'Digital Product has been inserted successfully' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  
    return res.status(405).end(); // Method Not Allowed
  }
