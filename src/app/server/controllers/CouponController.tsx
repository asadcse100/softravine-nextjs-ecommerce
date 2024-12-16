import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  type: string;
  code: string;
  details: string;
  discount: string;
  discount_type: string;
  start_date: number;
  end_date: number;
  status: number;
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
    console.error("Error fetching admin:", error);
    return { success: false, error };
  }
}

export const store = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const admin = await prisma.users.findFirst({
      where: { user_type: 'admin' },
    });

    if (!admin) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    const { code, discount } = req.body;

    const newCoupon = await prisma.coupons.create({
      data: {
        code,
        discount: parseFloat(discount),
        user_id: admin.id,
      },
    });

    if (newCoupon) {
      res.status(200).json({ success: 'Coupon has been saved successfully' });
    } else {
      res.status(400).json({ error: 'Failed to create coupon' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to create coupon' });
  }
};

export const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { code, discount } = req.body;

    const updatedCoupon = await prisma.coupons.update({
      where: { id: Number(id) },
      data: {
        code,
        discount: parseFloat(discount),
      },
    });

    if (updatedCoupon) {
      res.status(200).json({ success: 'Coupon has been updated successfully' });
    } else {
      res.status(400).json({ error: 'Failed to update coupon' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update coupon' });
  }
};

export const destroy = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    await prisma.coupons.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ success: 'Coupon has been deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete coupon' });
  }
};

export const getCouponForm = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { coupon_type } = req.body;

    if (coupon_type === 'product_base') {
      // Retrieve products from the database
      const admin = await prisma.users.findFirst({
        where: { user_type: 'admin' },
      });

      if (!admin) {
        return res.status(404).json({ error: 'Admin user not found' });
      }

      const products = await prisma.products.findMany({
        where: { userId: admin.id },
      });

      res.status(200).json({ products });
    } else if (coupon_type === 'cart_base') {
      res.status(200).json({ form: 'cart_base_coupon_form' });
    } else {
      res.status(400).json({ error: 'Invalid coupon type' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get coupon form' });
  }
};

export const getCouponFormEdit = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { coupon_type, id } = req.body;

    if (coupon_type === 'product_base') {
      // Retrieve coupon and products from the database
      const admin = await prisma.users.findFirst({
        where: { user_type: 'admin' },
      });

      if (!admin) {
        return res.status(404).json({ error: 'Admin user not found' });
      }

      const coupon = await prisma.coupons.findUnique({
        where: { id: Number(id) },
      });

      if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }

      const products = await prisma.products.findMany({
        where: { user_id: admin.id },
      });

      res.status(200).json({ coupon, products });
    } else if (coupon_type === 'cart_base') {
      // Retrieve coupon from the database
      const coupon = await prisma.coupons.findUnique({
        where: { id: Number(id) },
      });

      if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }

      res.status(200).json({ coupon });
    } else {
      res.status(400).json({ error: 'Invalid coupon type' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to get coupon form for editing' });
  }
};