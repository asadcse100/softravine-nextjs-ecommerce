import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import { getProductById, updateProduct } from '../models/AuctionProduct';
import { slugify } from '@/app/server/utils/slugify';  // Utility function for generating slugs
import { Product } from '@/app/server/types/product';
import { parseISO, differenceInDays } from 'date-fns';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();


type createOrUpdateData = {
  id: number | null;
  user_id: number;
  category_id: number;
  brand_id: number;
  added_by: string;
  name: string;
  photos: string;
  thumbnail_img: string;
  video_provider: string;
  video_link: string;
  tags?: string;
  description: string;
  unit_price: number;
  purchase_price: number;
  variant_product: number;
  attributes: string;
  choice_options: string;
  colors: string;
  variations: string;
  todays_deal: boolean;
  published: number;
  approved: number;
  stock_visibility_state: string;
  cash_on_delivery: boolean;
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
  is_quantity_multiplied?: boolean;
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

export const getAllAuctionProducts = async () => {
  try {
    const products = await prisma.products.findMany();
    // Convert BigInt fields to strings
    const serializedProducts = products.map(product => ({
      ...product,
      id: product.id.toString(), // Assuming id is the BigInt field
      user_id: product.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedProducts };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error };
  }
}

export async function createOrUpdateAuctionProduct(data: createOrUpdateData) {
  try {
    // Find the admin user
    const adminUser = await prisma.users.findFirst({
      where: { user_type: 'admin' },
    });

    if (!adminUser) {
      return { success: false, error: 'Admin user not found' };
    }

    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    // Generate slug
    const slug = slugify(data.name, { lower: true, strict: true });

    // Insert the product into the database
    // const product = await prisma.products.create({
    //   data: {
    //     name: data.name,
    //     added_by: data.addedBy,
    //     user_id: adminUser.id,
    //     auction_product: 1,
    //     category_id: data.categoryId,
    //     brand_id: data.brandId,
    //     barcode: data.barcode,
    //     startingBid: data.startingBid,
    //     // refundable: data.refundable || 0,
    //     refundable: 1 || 0,
    //     photos: data.photos,
    //     thumbnailImg: data.thumbnailImg,
    //     tags: data.tags,
    //     description: data.description,
    //     videoProvider: data.videoProvider,
    //     videoLink: data.videoLink,
    //     auctionStartDate: data.auctionDateRange
    //       ? new Date(data.auctionDateRange[0])
    //       : null,
    //     auctionEndDate: data.auctionDateRange
    //       ? new Date(data.auctionDateRange[1])
    //       : null,
    //     shippingType: data.shippingType,
    //     estShippingDays: data.estShippingDays,
    //     shippingCost: data.shippingCost,
    //     earnPoint: data.earnPoint,
    //     isQuantityMultiplied: data.isQuantityMultiplied || false,
    //     metaTitle: data.metaTitle || data.name,
    //     metaDescription: data.metaDescription || data.description,
    //     metaImg: data.metaImg || data.thumbnailImg,
    //     pdf: data.pdf,
    //     cashOnDelivery: data.cashOnDelivery || false,
    //     todaysDeal: data.todaysDeal || false,
    //     slug,
    //   },
    // });

    const newPost = await prisma.products.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        name: data.name,
        added_by: data.name,
        user_id: data.user_id,
        category_id: data.category_id,
        brand_id: data.brand_id,
        barcode: data.barcode,
        starting_bid: data.starting_bid,
        auction_product: data.auction_product,
        refundable: data.refundable,
        photos: data.photos,
        thumbnail_img: data.thumbnail_img,
        tags: data.tags,
        description: data.description,
        video_provider: data.video_provider,
        video_link: data.video_link,
        auction_start_date: data.auction_start_date,
        auction_end_date: data.auction_end_date,
        shipping_type: data.shipping_type,
        est_shipping_days: data.est_shipping_days,
        shipping_cost: data.shipping_cost,
        is_quantity_multiplied: data.is_quantity_multiplied,
        meta_title: data.meta_title,
        meta_description: data.meta_description || data.description,
        meta_img: data.meta_img || data.thumbnail_img,
        pdf: data.pdf,
        cash_on_delivery: data.cash_on_delivery || false,
        todays_deal: data.todays_deal || false,
        updated_at: data.created_at,
        slug
      },
      create: {
        name: data.name,
        added_by: data.name,
        user_id: data.user_id,
        category_id: data.category_id,
        brand_id: data.brand_id,
        barcode: data.barcode,
        starting_bid: data.starting_bid,
        auction_product: data.auction_product,
        refundable: data.refundable,
        photos: data.photos,
        thumbnail_img: data.thumbnail_img,
        tags: data.tags,
        description: data.description,
        video_provider: data.video_provider,
        video_link: data.video_link,
        auction_start_date: data.auction_start_date,
        auction_end_date: data.auction_end_date,
        shipping_type: data.shipping_type,
        est_shipping_days: data.est_shipping_days,
        shipping_cost: data.shipping_cost,
        is_quantity_multiplied: data.is_quantity_multiplied,
        meta_title: data.meta_title,
        meta_description: data.meta_description || data.description,
        meta_img: data.meta_img || data.thumbnail_img,
        pdf: data.pdf,
        cash_on_delivery: data.cash_on_delivery || false,
        todays_deal: data.todays_deal || false,
        created_at: data.created_at,
        slug
      }
    });

    // Insert associated tax data if provided
    if (data.tax_id && data.tax && data.tax_type) {
      const taxData = data.tax_id.map((taxId, index) => ({
        productId: products.id,
        taxId,
        tax: data.tax[index],
        taxType: data.tax_type[index],
      }));

      await prisma.product_taxes.createMany({ data: taxData });
    }

    return { success: true, data: product };
  } catch (error) {
    console.error('Error creating auction product:', error);
    return { success: false, error: error.message };
  }
}



// export const updateAuctionProduct = async (data: createOrUpdateData) => {
//   const { id } = req.query;
//   const {
//     categoryId, brandId, barcode, cashOnDelivery, isQuantityMultiplied,
//     refundable, lang, name, unit, description, slug, photos, thumbnailImg,
//     tags, videoProvider, videoLink, startingBid, auctionDateRange,
//     shippingType, estShippingDays, earnPoint, flatShippingCost,
//     shippingCost, metaTitle, metaDescription, metaImg, pdf, tax_id, tax,
//     tax_type
//   } = req.body as Product;

//   try {
//     const product = await prisma.products.update({
//       where: { id: Number(id) },
//       data: {
//         categoryId,
//         brandId,
//         barcode,
//         cashOnDelivery: cashOnDelivery || false,
//         isQuantityMultiplied: isQuantityMultiplied || false,
//         refundable: refundable || false,
//         photos,
//         thumbnailImg,
//         tags: tags ? tags.join(',') : undefined,
//         videoProvider,
//         videoLink,
//         startingBid: startingBid ? parseFloat(startingBid) : undefined,
//         auctionStartDate: auctionDateRange ? new Date(auctionDateRange[0]) : undefined,
//         auctionEndDate: auctionDateRange ? new Date(auctionDateRange[1]) : undefined,
//         shippingType,
//         estShippingDays,
//         earnPoint: earnPoint ? parseInt(earnPoint) : undefined,
//         shippingCost: shippingType === 'free' ? 0 : shippingType === 'flat_rate' ? flatShippingCost : JSON.stringify(shippingCost),
//         metaTitle: metaTitle || name,
//         metaDescription: metaDescription || description,
//         metaImg: metaImg || thumbnailImg,
//         pdf,
//         colors: JSON.stringify([]),
//         attributes: JSON.stringify([]),
//         choiceOptions: JSON.stringify([])
//       }
//     });

//     await prisma.productTranslation.upsert({
//       where: { productId_lang: { productId: product.id, lang } },
//       update: { name, unit, description },
//       create: { productId: product.id, lang, name, unit, description }
//     });

//     await prisma.productTax.deleteMany({ where: { productId: product.id } });
//     if (tax_id && tax && tax_type) {
//       for (let i = 0; i < tax_id.length; i++) {
//         await prisma.productTax.create({
//           data: {
//             productId: product.id,
//             taxId: tax_id[i],
//             tax: parseFloat(tax[i]),
//             taxType: tax_type[i]
//           }
//         });
//       }
//     }

//     res.status(200).json({ message: 'Product updated successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update product' });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

export const deleteProduct = async (data: createOrUpdateData) => {
  // const { id } = req.query;
  const id = data.id;

  try {
    const product = await prisma.products.findUnique({
      where: { id: Number(id) },
      include: {
        product_translations: true,
        bids: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete product translations
    await prisma.product_translations.deleteMany({
      where: { product_id: product.id },
    });

    // Delete bids
    await prisma.products.deleteMany({
      where: { id: product.id },
    });

    // Delete the product
    await prisma.products.delete({
      where: { id: product.id },
    });

    // Delete related items in the cart
    await prisma.carts.deleteMany({
      where: { product_id: product.id },
    });

    return res.status(200).json({ message: 'Product has been deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};


export const updatePublished = async (data: createOrUpdateData) => {
  // const { id, status } = req.body;
  const id = data.id;
  const status = data.status;

  try {
    const product = await prisma.products.findUnique({
      where: { id: Number(id) },
      include: {
        users: {
          include: {
            sellers: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.published = status;

    if (
      product.addedBy === 'seller' &&
      (await prisma.addon.findUnique({ where: { uniqueIdentifier: 'seller_subscription' } }))?.activated
    ) {
      const seller = product.users.sellers;
      if (seller?.invalidAt && differenceInDays(new Date(), parseISO(seller.invalidAt)) <= 0) {
        return res.status(403).json({ message: 'Seller subscription invalid' });
      }
    }

    await prisma.products.update({
      where: { id: product.id },
      data: { published: status },
    });

    return res.status(200).json({ message: 'Product status updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

// export const getAllAuctionProducts = async (request: Request) => {
//   const { searchParams } = new URL(request.url);
//   const page = searchParams.get('page') || '1';
//   const pageSize = searchParams.get('pageSize') || '12';

//   const currentPage = parseInt(page, 10);
//   const currentPageSize = parseInt(pageSize, 10);

//   try {
//     // Fetch auction products with pagination
//     const products = await prisma.products.findMany({
//       where: {
//         published: 1,
//         auction_product: 1,
//         auction_start_date: {
//           lte: new Date(),
//         },
//         auction_end_date: {
//           gte: new Date(),
//         },
//       },
//       orderBy: {
//         created_at: 'desc',
//       },
//       skip: (currentPage - 1) * currentPageSize,
//       take: currentPageSize,
//     });

//     // Count total auction products
//     const totalProducts = await prisma.products.count({
//       where: {
//         published: 1,
//         auction_product: 1,
//         auction_start_date: {
//           lte: new Date(),
//         },
//         auctionEndDate: {
//           gte: new Date(),
//         },
//       },
//     });

//     const totalPages = Math.ceil(totalProducts / currentPageSize);

//     // Return JSON response using NextResponse
//     return NextResponse.json({
//       products,
//       pagination: {
//         totalProducts,
//         totalPages,
//         currentPage,
//         pageSize: currentPageSize,
//       },
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Something went wrong', error: error.message },
//       { status: 500 }
//     );
//   }
// };
// 

// export const getAllAuctionProducts = async (search: string | null = '', page: number = 1) => {
//   const pageSize = 15; // Number of products per page
//   const skip = (page - 1) * pageSize;

//   try {
//     let whereClause = { auction_product: 1 }; // Only fetch auction products

//     // If there's a search term, add it to the where clause
//     if (search) {
//       whereClause = {
//         ...whereClause,
//         name: {
//           contains: search,  // Search by product name
//           mode: "insensitive",  // Case-insensitive search
//         },
//       };
//     }

//     const products = await prisma.products.findMany({
//       where: whereClause,
//       orderBy: { created_at: 'desc' },
//       skip,
//       take: pageSize,
//     });

//     const totalProducts = await prisma.products.count({
//       where: whereClause,
//     });

//     return {
//       success: true,
//       data: products,
//       pagination: {
//         currentPage: page,
//         totalPages: Math.ceil(totalProducts / pageSize),
//       },
//       sort_search: search,
//     };
//   } catch (error) {
//     console.error("Error fetching auction products:", error);
//     return { success: false, error: error.message };
//   }
// };

// Utility function to generate slugs
function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const getAuctionProductDetails = async (data: createOrUpdateData) => {
  // const { slug } = req.query;
  const slug = generateSlug(data.name);

  try {
    const detailedProduct = await prisma.products.findUnique({
      where: { slug: slug as string },
    });

    if (detailedProduct) {
      return res.status(200).json(detailedProduct);
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const getUserPurchaseHistory = async (data: createOrUpdateData) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.users.id;

  try {
    const orders = await prisma.order_details.findMany({
      where: {
        orders: {
          user_id: userId,
        },
        products: {
          auction_products: true,
        },
      },
      orderBy: {
        orders: {
          code: 'desc',
        },
      },
      select: {
        id: true,
        // Add other fields as needed
      },
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

// export const getAuctionProductOrders = async () => {
//   const { payment_status, delivery_status, search, date } = req.query;

//   const filters: any = {
//     orderDetails: {
//       some: {
//         product: {
//           auctionProduct: true
//         }
//       }
//     }
//   };

//   if (payment_status) filters.paymentStatus = payment_status as string;
//   if (delivery_status) filters.deliveryStatus = delivery_status as string;
//   if (search) filters.code = { contains: search as string };
//   if (date) {
//     const [startDate, endDate] = (date as string).split(' to ');
//     filters.createdAt = {
//       gte: new Date(startDate),
//       lte: new Date(endDate)
//     };
//   }

//   try {
//     const orders = await prisma.orders.findMany({
//       where: filters,
//       orderBy: {
//         code: 'desc'
//       },
//       include: {
//         orderDetails: {
//           include: {
//             product: true
//           }
//         }
//       }
//     });
//     return { success: true, data: orders };
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     return { success: false, error };
//   }
// };

export const getAuctionProductOrders = async () => {
  // const { payment_status, delivery_status, search, date } = req.query;

  // const filters: any = {
  //   orderDetails: {
  //     some: {
  //       product: {
  //         auctionProduct: true
  //       }
  //     }
  //   }
  // };

  // if (payment_status) filters.paymentStatus = payment_status as string;
  // if (delivery_status) filters.deliveryStatus = delivery_status as string;
  // if (search) filters.code = { contains: search as string };
  // if (date) {
  //   const [startDate, endDate] = (date as string).split(' to ');
  //   filters.createdAt = {
  //     gte: new Date(startDate),
  //     lte: new Date(endDate)
  //   };
  // }

  try {
    const orders = await prisma.orders.findMany({
      orderBy: {
        code: 'desc'
      }
    });
    return { success: true, data: orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error };
  }
};


export const getAuctionOrderDetails = async (data: createOrUpdateData) => {
  // const { id } = req.query;
  const id = data.id;

  try {
    const decryptedId = parseInt(id as string); // Replace with your decryption logic if needed
    const order = await prisma.orders.findUnique({
      where: { id: decryptedId },
      include: {
        order_details: {
          include: {
            products: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderShippingAddress = order.shipping_address;
    const deliveryBoys = await prisma.users.findMany({
      where: {
        city: order_shipping_address.city,
        user_type: 'delivery_boy'
      }
    });

    await prisma.orders.update({
      where: { id: decryptedId },
      data: { viewed: true }
    });

    res.status(200).json({ order, deliveryBoys });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};