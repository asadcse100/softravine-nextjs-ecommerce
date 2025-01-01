import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  type: string;
  code: string;
  details: string;
  discount: number;
  discount_type: string;
  start_date: number;
  end_date: number;
  status: boolean;
  created_at?: string;
};

// export const index = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const admin = await prisma.user.findFirst({
//       where: { user_type: 'admin' },
//     });

//     if (!admin) {
//       return res.status(404).json({ error: 'Admin user not found' });
//     }

//     const coupons = await prisma.coupon.findMany({
//       where: { userId: admin.id },
//       orderBy: { id: 'desc' },
//     });

//     res.status(200).json({ coupons });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch coupons' });
//   }
// };

export const getCouponById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.coupons.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    // console.error("Error category:", error);
    return { success: false, error };
  }
};

export const index = async () => {
  try {
    const coupons = await prisma.coupons.findMany();
    // Convert BigInt fields to strings
    const serializedCoupons = coupons.map(coupon => ({
      ...coupon,
      user_id: coupon.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedCoupons };
  } catch (error) {
    // console.error("Error fetching admin:", error);
    return { success: false, error };
  }
}

// export const store = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const admin = await prisma.users.findFirst({
//       where: { user_type: 'admin' },
//     });

//     if (!admin) {
//       return res.status(404).json({ error: 'Admin user not found' });
//     }

//     const { code, discount } = req.body;

//     const newCoupon = await prisma.coupons.create({
//       data: {
//         code,
//         discount: parseFloat(discount),
//         user_id: admin.id,
//       },
//     });

//     if (newCoupon) {
//       res.status(200).json({ success: 'Coupon has been saved successfully' });
//     } else {
//       res.status(400).json({ error: 'Failed to create coupon' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create coupon' });
//   }
// };

export async function createOrUpdateCoupon(data: createOrUpdateData) {
  try {

    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.coupons.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        user_id: data.user_id,
        type: data.type,
        code: data.code,
        details: data.details,
        discount: data.discount,
        discount_type: data.discount_type,
        start_date: data.start_date,
        end_date: data.end_date,
        status: data.status,
        updated_at: data.created_at,
      },
      create: {
        user_id: data.user_id,
        type: data.type,
        code: data.code,
        details: data.details,
        discount: data.discount,
        discount_type: data.discount_type,
        start_date: data.start_date,
        end_date: data.end_date,
        status: data.status,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    // console.error("Error creating blog post:", error);
    return { success: false, error };
  }
};

// export const update = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { id } = req.query;
//     const { code, discount } = req.body;

//     const updatedCoupon = await prisma.coupons.update({
//       where: { id: Number(id) },
//       data: {
//         code,
//         discount: parseFloat(discount),
//       },
//     });

//     if (updatedCoupon) {
//       res.status(200).json({ success: 'Coupon has been updated successfully' });
//     } else {
//       res.status(400).json({ error: 'Failed to update coupon' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update coupon' });
//   }
// };

// export const destroy = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { id } = req.query;

//     await prisma.coupons.delete({
//       where: { id: Number(id) },
//     });

//     res.status(200).json({ success: 'Coupon has been deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete coupon' });
//   }
// };


export const deleteCoupon = async (id: number) => {
  try {
    // Check if the record exists
    const existingCoupons = await prisma.coupons.findUnique({
      where: { id },
    });

    if (!existingCoupons) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedCoupons = await prisma.coupons.delete({
      where: { id },
    });
    return { success: true, data: deletedCoupons };
  } catch (error) {
    // console.error("Error deleting Coupon:", error);
    return { success: false, error };
  }
};

export const getCouponForm = async () => {
  try {
    const { coupon_type } = req.body;

    if (coupon_type === 'product_base') {
      // Retrieve products from the database
      const admin = await prisma.users.findFirst({
        where: { user_type: 'admin' },
      });

      if (!admin) {
        return { success: false, error };
        // return res.status(404).json({ error: 'Admin user not found' });
      }

      const products = await prisma.products.findMany({
        where: { user_id: admin.id },
      });

      return { success: true, data: products };
      // res.status(200).json({ products });
    } else if (coupon_type === 'cart_base') {
      return { success: true, form: 'cart_base_coupon_form' };
      // res.status(200).json({ form: 'cart_base_coupon_form' });
    } else {
      return { success: false };
      // res.status(400).json({ error: 'Invalid coupon type' });
    }
  } catch (error) {
    return { success: false, error: "Failed to get coupon form" };
    // res.status(500).json({ error: 'Failed to get coupon form' });
  }
};

export const getCouponFormEdit = async () => {
  try {
    const { coupon_type, id } = req.body;

    if (coupon_type === 'product_base') {
      // Retrieve coupon and products from the database
      const admin = await prisma.users.findFirst({
        where: { user_type: 'admin' },
      });

      if (!admin) {
        // return res.status(404).json({ error: 'Admin user not found' });
        return { success: false, error: "Record does not exist." };
      }

      const coupon = await prisma.coupons.findUnique({
        where: { id: Number(id) },
      });

      if (!coupon) {
        return { success: false, error: "Record does not exist." };
        // return res.status(404).json({ error: 'Coupon not found' });
      }

      const products = await prisma.products.findMany({
        where: { user_id: admin.id },
      });

      return { success: true, data: coupon, products };
      // res.status(200).json({ coupon, products });
    } else if (coupon_type === 'cart_base') {
      // Retrieve coupon from the database
      const coupon = await prisma.coupons.findUnique({
        where: { id: Number(id) },
      });

      if (!coupon) {
        return { success: false, error: "Record does not exist." };
        // return res.status(404).json({ error: 'Coupon not found' });
      }
      return { success: true, data: coupon };
      // res.status(200).json({ coupon });
    } else {
      return { success: false, error: "Invalid coupon type." };
      // res.status(400).json({ error: 'Invalid coupon type' });
    }
  } catch (error) {
    return { success: false, error: "error 500." };
    // res.status(500).json({ error: 'Failed to get coupon form for editing' });
  }
};