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
    console.error("Error category:", error);
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
    console.error("Error fetching admin:", error);
    return { success: false, error };
  }
}

// import { Request, Response } from 'express';
// import Coupon from '../models/Coupon'; // Make sure to import your Coupon model
// import Auth from '../services/Auth'; // Assuming you have an Auth service for authentication

// export async function index(req: Request, res: Response) {
//     try {
//         const coupons = await Coupon.find({ user_id: Auth.user.id }).sort({ id: 'desc' });
//         return res.render('seller.coupons.index', { coupons });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// export async function create(req: Request, res: Response) {
//     try {
//         return res.render('seller.coupons.create');
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// export async function store(req: Request, res: Response) {
//     try {
//         const user_id = Auth.user.id;
//         await Coupon.create({ ...req.body, user_id });
        
//         // Flash message not available in this conversion
//         return res.redirect('seller.coupon.index');
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// export async function edit(req: Request, res: Response) {
//     try {
//         const coupon = await Coupon.findById(decrypt(req.params.id));
//         return res.render('seller.coupons.edit', { coupon });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// export async function update(req: Request, res: Response) {
//     try {
//         const coupon = await Coupon.findById(req.params.id);
//         await coupon.updateOne(req.body);

//         // Flash message not available in this conversion
//         return res.redirect('seller.coupon.index');
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// export async function destroy(req: Request, res: Response) {
//     try {
//         await Coupon.findByIdAndDelete(req.params.id);

//         // Flash message not available in this conversion
//         return res.redirect('seller.coupon.index');
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// export async function get_coupon_form(req: Request, res: Response) {
//     try {
//         if (req.body.coupon_type === "product_base") {
//             const products = await filter_products(\App\Models\Product.find({ user_id: Auth.user.id }));
//             return res.render('partials.coupons.product_base_coupon', { products });
//         } else if (req.body.coupon_type === "cart_base") {
//             return res.render('partials.coupons.cart_base_coupon');
//         }
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }

// export async function get_coupon_form_edit(req: Request, res: Response) {
//     try {
//         if (req.body.coupon_type === "product_base") {
//             const coupon = await Coupon.findById(req.body.id);
//             const products = await filter_products(\App\Models.Product.find({ user_id: Auth.user.id }));
//             return res.render('partials.coupons.product_base_coupon_edit', { coupon, products });
//         } else if (req.body.coupon_type === "cart_base") {
//             const coupon = await Coupon.findById(req.body.id);
//             return res.render('partials.coupons.cart_base_coupon_edit', { coupon });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }
