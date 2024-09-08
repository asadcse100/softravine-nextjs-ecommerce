import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  try{
      const admin = await prisma.user.findMany();
      return { success: true, data: admin };
  }catch(error){
      console.error("Error fetching admin:", error);
      return { success: false, error };
  }
}

export const store = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const admin = await prisma.user.findFirst({
        where: { user_type: 'admin' },
      });
  
      if (!admin) {
        return res.status(404).json({ error: 'Admin user not found' });
      }
  
      const { code, discount } = req.body;
  
      const newCoupon = await prisma.coupon.create({
        data: {
          code,
          discount: parseFloat(discount),
          userId: admin.id,
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
  
      const updatedCoupon = await prisma.coupon.update({
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
  
      await prisma.coupon.delete({
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
        const admin = await prisma.user.findFirst({
          where: { user_type: 'admin' },
        });
  
        if (!admin) {
          return res.status(404).json({ error: 'Admin user not found' });
        }
  
        const products = await prisma.product.findMany({
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
        const admin = await prisma.user.findFirst({
          where: { user_type: 'admin' },
        });
  
        if (!admin) {
          return res.status(404).json({ error: 'Admin user not found' });
        }
  
        const coupon = await prisma.coupon.findUnique({
          where: { id: Number(id) },
        });
  
        if (!coupon) {
          return res.status(404).json({ error: 'Coupon not found' });
        }
  
        const products = await prisma.product.findMany({
          where: { userId: admin.id },
        });
  
        res.status(200).json({ coupon, products });
      } else if (coupon_type === 'cart_base') {
        // Retrieve coupon from the database
        const coupon = await prisma.coupon.findUnique({
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