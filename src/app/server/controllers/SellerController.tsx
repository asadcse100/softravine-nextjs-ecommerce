import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  rating: number;
  num_of_reviews: number;
  num_of_sale: number;
  verification_status: number;
  verification_info: string;
  cash_on_delivery_status: number;
  admin_to_pay: number;
  bank_name: string;
  bank_acc_name: string;
  bank_acc_no: string;
  bank_routing_no: number;
  bank_payment_status: number;
  created_at?: string;
};

// export async function getSellers(req: NextApiRequest, res: NextApiResponse) {
//   const { search, approved_status } = req.query;

//   try {
//     let sellers = await prisma.shop.findMany({
//       where: {
//         user: {
//           user_type: 'seller',
//           AND: [
//             {
//               OR: [
//                 { name: { contains: search } },
//                 { email: { contains: search } }
//               ]
//             }
//           ]
//         },
//         verification_status: approved_status
//       },
//       include: {
//         user: true // Include user details
//       }
//     });

//     res.status(200).json(sellers);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export const getSellers = async () => {
  try {
    const shops = await prisma.shops.findMany();
    // Convert BigInt fields to strings
    const serializedShops = shops.map(shop => ({
      ...shop,
      user_id: shop.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedShops };
  } catch (error) {
    console.error("Error fetching shop:", error);
    return { success: false, error };
  }
}

// export async function createSeller(req: NextApiRequest, res: NextApiResponse) {
//   const { name, email, password } = req.body;

//   try {
//     // Check if email already exists
//     const existingUser = await prisma.user.findFirst({
//       where: {
//         email,
//       },
//     });

//     if (existingUser) {
//       return res.status(400).json({ error: 'Email already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         user_type: 'seller',
//         password: hashedPassword,
//       },
//     });

//     // Create seller
//     await prisma.seller.create({
//       data: {
//         user_id: user.id,
//       },
//     });

//     // Create shop
//     await prisma.shop.create({
//       data: {
//         user_id: user.id,
//         slug: `demo-shop-${user.id}`,
//       },
//     });

//     res.status(201).json({ message: 'Seller created successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export async function createOrUpdateSeller(data: createOrUpdateData) {
    try {

      const created_at = data.created_at ? new Date(data.created_at) : new Date();

      const newPost = await prisma.sellers.upsert({
        where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
        update: {
          user_id: data.user_id,
          rating: data.rating,
          num_of_reviews: data.num_of_reviews,
          num_of_sale: data.num_of_sale,
          verification_status: data.verification_status,
          verification_info: data.verification_info,
          cash_on_delivery_status: data.cash_on_delivery_status,
          admin_to_pay: data.admin_to_pay,
          bank_name: data.bank_name,
          bank_acc_name: data.bank_acc_name,
          bank_acc_no: data.bank_acc_no,
          bank_routing_no: data.bank_routing_no,
          bank_payment_status: data.bank_payment_status,
          updated_at: data.created_at,
        },
        create: {
          user_id: data.user_id,
          rating: data.rating,
          num_of_reviews: data.num_of_reviews,
          num_of_sale: data.num_of_sale,
          verification_status: data.verification_status,
          verification_info: data.verification_info,
          cash_on_delivery_status: data.cash_on_delivery_status,
          admin_to_pay: data.admin_to_pay,
          bank_name: data.bank_name,
          bank_acc_name: data.bank_acc_name,
          bank_acc_no: data.bank_acc_no,
          bank_routing_no: data.bank_routing_no,
          bank_payment_status: data.bank_payment_status,
          created_at: data.created_at,
        }
      });

      return { success: true, data: newPost };
    } catch (error) {
      console.error("Error creating blog post:", error);
      return { success: false, error };
    }
  }

// export async function updateSeller(req: NextApiRequest, res: NextApiResponse) {
//   const { id } = req.query;
//   const { name, email, password } = req.body;

//   try {
//     // Find shop by ID
//     const shop = await prisma.shop.findFirst({
//       where: {
//         id: Number(id),
//       },
//       include: {
//         user: true,
//       },
//     });

//     if (!shop) {
//       return res.status(404).json({ error: 'Shop not found' });
//     }

//     // Update user
//     await prisma.user.update({
//       where: {
//         id: shop.user.id,
//       },
//       data: {
//         name,
//         email,
//         ...(password && { password: await bcrypt.hash(password, 10) }),
//       },
//     });

//     res.status(200).json({ message: 'Seller updated successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }


export async function deleteSeller() {
    const { id } = req.query;

    try {
      if (Array.isArray(id)) {
        // Bulk delete
        await Promise.all(
          id.map(async (shopId) => {
            await deleteShopAndUser(Number(shopId));
          })
        );
      } else {
        // Single delete
        await deleteShopAndUser(Number(id));
      }

      res.status(200).json({ message: 'Sellers deleted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async function deleteShopAndUser(shopId: number) {
    const shop = await prisma.shops.findFirst({
      where: {
        id: shopId,
      },
      include: {
        users: true,
        products: true,
        orders: {
          include: {
            orderDetails: true,
          },
        },
      },
    });

    if (!shop) {
      return;
    }

    // Delete user's products
    await prisma.products.deleteMany({
      where: {
        user_id: shop.user_id,
      },
    });

    // Delete user's orders and order details
    await prisma.order_details.deleteMany({
      where: {
        order_id: {
          in: shop.orders.map((order) => order.id),
        },
      },
    });

    await prisma.orders.deleteMany({
      where: {
        user_id: shop.user_id,
      },
    });

    // Delete user
    await prisma.users.delete({
      where: {
        id: shop.user_id,
      },
    });

    // Delete shop
    await prisma.shops.delete({
      where: {
        id: shopId,
      },
    });
  }