import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  product_id: number;
  amount: number;
  category_id: number;
  brand_id: number;
  added_by: string;
  name: string;
  photos: string[];
  thumbnail_img: string;
  video_provider: string;
  video_link: string;
  tags: string[];
  description: string;
  unit_price: number;
  purchase_price: number;
  variant_product: number;
  attributes: string;
  choice_options: string;
  colors: string;
  variations: string;
  todays_deal: number;
  published: number;
  approved: number;
  stock_visibility_state: string;
  cash_on_delivery: number;
  featured: number;
  seller_featured: number;
  current_stock: number;
  unit: string;
  weight: number;
  min_qty: number;
  low_stock_quantity: number;
  discount: number;
  discount_type: string;
  discount_start_date: number;
  discount_end_date: number;
  starting_bid: number;
  auction_start_date: number;
  auction_end_date: number;
  tax_type?: string[];
  shipping_type: string;
  shipping_cost: number;
  is_quantity_multiplied: number;
  est_shipping_days: number;
  num_of_sale: number;
  meta_title: string;
  meta_description: string;
  meta_img: string;
  pdf: string;
  slug: string;
  refundable: number;
  rating: number;
  barcode: string;
  digital: number;
  auction_product: number;
  file_name: string;
  file_path: string;
  external_link: string;
  external_link_btn: string;
  wholesale_product: number;
  tax_id?: number[];
  tax?: number[];
  created_at: string;
  auctionDateRange: [string, string];
};

// export const getMyBiddedProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  export const getMyBiddedProducts = async (data: createOrUpdateData) => {
  const session = await getSession({ req });
  if (!session) {
    // return res.status(401).json({ error: 'Unauthorized' });
    return { success: false, error: "Unauthorized" };

    // console.error("Unauthorized", error);
    // return { success: false, error };
  }

  const userId = session.users.id;

  try {
    const bids = await prisma.auction_product_bids.findMany({
      where: { user_id: userId },
      orderBy: { id: 'desc' },
      distinct: ['id'],
      include: {
        products: true
      },
      take: 20 // For pagination purposes, you can adjust as needed
    });

    // res.status(200).json({ bids });
    return { success: true, data: bids };
  } catch (error) {
    console.error("Error fetching bids:", error);
    return { success: false, error };
  }
};

export const placeBid = async (data: createOrUpdateData) => {
  const session = await getSession({ req });
  if (!session) {
    // return res.status(401).json({ error: 'Unauthorized' });
    return { success: false, error: "Unauthorized" };
    // return { success: false, error: "Record does not exist." };
  }

  const user_id = session.users.id;
  const { product_id, amount } = req.body;

  try {
    let bid = await prisma.auction_product_bids.findFirst({
      where: {
        product_id: product_id,
        user_id: user_id
      }
    });

    if (!bid) {
      bid = await prisma.auction_product_bids.create({
        data: {
          user_id: user_id,
          product_id: product_id,
          amount: amount
        }
      });
    } else {
      bid = await prisma.auction_product_bids.update({
        where: {
          id: bid.id
        },
        data: {
          amount: amount
        }
      });
    }
    return { success: false, error: "Unauthorized" };
    // res.status(200).json({ message: 'Bid Placed Successfully', bid });
  } catch (error) {
    return { success: false, error: "Something went wrong!" };
    // res.status(500).json({ error: 'Something went wrong!' });
  }
};


export const showProductWithBids = async (id: number) => {
  // const { id } = req.query;

  try {
    const product = await prisma.products.findUnique({
      where: { id: id },
      include: {
        auction_product_bids: {
          orderBy: {
            created_at: 'desc'
          }
        }
      }
    });

    if (!product) {
      return { success: false, error: "Product not found!" };
      // return res.status(404).json({ error: 'Product not found' });
    }
    return { success: false };
    // return { success: false, error: "Product not found!" };
    // return NextResponse.json({ product, bids: product.auction_product_bids }, { status: 200 });
    // res.status(200).json({ product, bids: product.auction_product_bids });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    // res.status(500).json({ error: 'Internal server error' });
  }
};