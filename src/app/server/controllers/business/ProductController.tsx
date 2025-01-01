import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
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
  tags: string;
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
  approved: boolean;
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
  tax_type?: string;
  shipping_type: string;
  shipping_cost: number;
  is_quantity_multiplied: boolean;
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
  tax?: number;
  created_at: string;
  auctionDateRange: [string, string];
};

export const selectProducts = async () => {
  try {
    const products = await prisma.products.findMany({
      select: {
        name: true,
      },
    });
    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error };
  }
}

export const getSellerProductById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.products.findUnique({
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

export const getProductById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.attributes.findUnique({
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

export const getInhouseProductById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.attributes.findUnique({
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

export const getSellerProducts = async () => {
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

// Utility function to generate slugs
function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createOrUpdateInhouseProduct(data: createOrUpdateData) {
  try {
    // Generate a slug
    const slug = generateSlug(data.name);
    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    // Perform the upsert operation
    const newCategory = await prisma.products.upsert({
      where: { id: data.id || 0, slug: slug }, // Replace `0` with a non-zero ID if necessary
      update: {
        user_id: data.user_id,
        category_id: data.category_id,
        brand_id: data.brand_id,
        name: data.name,
        slug: slug,
        added_by: data.added_by,
        photos: data.photos,
        thumbnail_img: data.thumbnail_img,
        video_provider: data.video_provider,
        video_link: data.video_link,
        tags: data.tags,
        unit_price: data.unit_price,
        purchase_price: data.purchase_price,
        description: data.description,
        variant_product: data.variant_product,
        attributes: data.attributes,
        colors: data.colors,
        variations: data.variations,
        todays_deal: data.todays_deal,
        published: data.published,
        choice_options: data.choice_options,
        approved: data.approved,
        stock_visibility_state: data.stock_visibility_state,
        cash_on_delivery: data.cash_on_delivery,
        featured: data.featured,
        seller_featured: data.seller_featured,
        current_stock: data.current_stock,
        unit: data.unit,
        weight: data.weight,
        min_qty: data.min_qty,
        low_stock_quantity: data.low_stock_quantity,
        discount: data.discount,
        discount_type: data.discount_type,
        discount_end_date: data.discount_end_date,
        discount_start_date: data.discount_start_date,
        starting_bid: data.starting_bid,
        auction_start_date: data.auction_start_date,
        auction_end_date: data.auction_end_date,
        tax_type: data.tax_type,
        shipping_type: data.shipping_type,
        shipping_cost: data.shipping_cost,
        is_quantity_multiplied: data.is_quantity_multiplied,
        est_shipping_days: data.est_shipping_days,
        num_of_sale: data.num_of_sale,
        pdf: data.pdf,
        refundable: data.refundable,
        rating: data.rating,
        barcode: data.barcode,
        digital: data.digital,
        auction_product: data.auction_product,
        file_name: data.file_name,
        file_path: data.file_path,
        external_link: data.external_link,
        external_link_btn: data.external_link_btn,
        meta_title: data.meta_title,
        wholesale_product: data.wholesale_product,
        tax_id: data.tax_id,
        tax: data.tax,
        auctionDateRange: data.auctionDateRange,
        meta_img: data.meta_img,
        meta_description: data.meta_description,
        updated_at: created_at,
      },
      create: {
        user_id: data.user_id,
        category_id: data.category_id,
        brand_id: data.brand_id,
        name: data.name,
        slug: slug,
        added_by: data.added_by,
        photos: data.photos,
        thumbnail_img: data.thumbnail_img,
        video_provider: data.video_provider,
        video_link: data.video_link,
        tags: data.tags,
        unit_price: data.unit_price,
        purchase_price: data.purchase_price,
        description: data.description,
        variant_product: data.variant_product,
        attributes: data.attributes,
        colors: data.colors,
        variations: data.variations,
        todays_deal: data.todays_deal,
        published: data.published,
        choice_options: data.choice_options,
        approved: data.approved,
        stock_visibility_state: data.stock_visibility_state,
        cash_on_delivery: data.cash_on_delivery,
        featured: data.featured,
        seller_featured: data.seller_featured,
        current_stock: data.current_stock,
        unit: data.unit,
        weight: data.weight,
        min_qty: data.min_qty,
        low_stock_quantity: data.low_stock_quantity,
        discount: data.discount,
        discount_type: data.discount_type,
        discount_end_date: data.discount_end_date,
        discount_start_date: data.discount_start_date,
        starting_bid: data.starting_bid,
        auction_start_date: data.auction_start_date,
        auction_end_date: data.auction_end_date,
        tax_type: data.tax_type,
        shipping_type: data.shipping_type,
        shipping_cost: data.shipping_cost,
        is_quantity_multiplied: data.is_quantity_multiplied,
        est_shipping_days: data.est_shipping_days,
        num_of_sale: data.num_of_sale,
        pdf: data.pdf,
        refundable: data.refundable,
        rating: data.rating,
        barcode: data.barcode,
        digital: data.digital,
        auction_product: data.auction_product,
        file_name: data.file_name,
        file_path: data.file_path,
        external_link: data.external_link,
        external_link_btn: data.external_link_btn,
        meta_title: data.meta_title,
        wholesale_product: data.wholesale_product,
        tax_id: data.tax_id,
        tax: data.tax,
        auctionDateRange: data.auctionDateRange,
        meta_img: data.meta_img,
        meta_description: data.meta_description,
        created_at: created_at,
      },
    });

    return { success: true, data: newCategory };
  } catch (error) {
    return { success: false, error };
    // console.error("Error creating or updating blog category:", error);
    // return { success: false, error: "An unexpected error occurred" };
  }
}

// export const createAuctionProduct = async (data: createOrUpdateData) => {
//   const {
//     name,
//     addedBy,
//     categoryId,
//     brandId,
//     barcode,
//     startingBid,
//     refundable,
//     photos,
//     thumbnailImg,
//     tags,
//     description,
//     videoProvider,
//     videoLink,
//     auctionDateRange,
//     shippingType,
//     estShippingDays,
//     earnPoint,
//     shippingCost,
//     isQuantityMultiplied,
//     metaTitle,
//     metaDescription,
//     metaImg,
//     pdf,
//     cashOnDelivery,
//     todaysDeal,
//     sku,
//     tax_id,
//     tax,
//     tax_type
//   } = req.body;

//   try {
//     const user = await prisma.user.findFirst({ where: { userType: 'admin' } });
//     if (!user) return res.status(404).json({ error: 'Admin user not found' });

//     const product = await prisma.product.create({
//       data: {
//         name,
//         addedBy,
//         userId: user.id,
//         auctionProduct: true,
//         categoryId,
//         brandId,
//         barcode,
//         startingBid,
//         refundable: refundable || false,
//         photos,
//         thumbnailImg,
//         tags,
//         description,
//         videoProvider,
//         videoLink,
//         auctionStartDate: auctionDateRange ? new Date(auctionDateRange[0]) : null,
//         auctionEndDate: auctionDateRange ? new Date(auctionDateRange[1]) : null,
//         shippingType,
//         estShippingDays,
//         earnPoint,
//         shippingCost,
//         isQuantityMultiplied: !!isQuantityMultiplied,
//         metaTitle: metaTitle || name,
//         metaDescription: metaDescription || description,
//         metaImg: metaImg || thumbnailImg,
//         pdf,
//         cashOnDelivery: !!cashOnDelivery,
//         todaysDeal: !!todaysDeal,
//         slug: slugify(name)
//       }
//     });

//     if (tax_id) {
//       for (let i = 0; i < tax_id.length; i++) {
//         await prisma.productTax.create({
//           data: {
//             productId: product.id,
//             taxId: tax_id[i],
//             tax: tax[i],
//             taxType: tax_type[i]
//           }
//         });
//       }
//     }

//     res.status(201).json({ message: 'Product has been inserted successfully', product });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while creating the product' });
//   }
// };


// export const updateAuctionProduct = async () => {
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
  const { id } = req.query;

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
    await prisma.bid.deleteMany({
      where: { productId: product.id },
    });

    // Delete the product
    await prisma.products.delete({
      where: { id: product.id },
    });

    // Delete related items in the cart
    await prisma.carts.deleteMany({
      where: { product_id: product.id },
    });
    return { success: true };
    // return res.status(200).json({ message: 'Product has been deleted successfully' });
  } catch (error) {
    return { success: false, error };
    // return res.status(500).json({ message: 'Something went wrong', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteInhouseProduct = async (data: createOrUpdateData) => {
  const { id } = req.query;

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
    await prisma.bid.deleteMany({
      where: { productId: product.id },
    });

    // Delete the product
    await prisma.products.delete({
      where: { id: product.id },
    });

    // Delete related items in the cart
    await prisma.carts.deleteMany({
      where: { product_id: product.id },
    });
    return { success: true };
    // return res.status(200).json({ message: 'Product has been deleted successfully' });
  } catch (error) {
    return { success: false, error };
    // return res.status(500).json({ message: 'Something went wrong', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteSellerProduct = async (data: createOrUpdateData) => {
  const { id } = req.query;

  try {
    const product = await prisma.products.findUnique({
      where: { id: Number(id) },
      include: {
        product_translations: true,
        bids: true,
      },
    });

    if (!product) {
      // return res.status(404).json({ message: 'Product not found' });
      return { success: false, error };
    }

    // Delete product translations
    await prisma.product_translations.deleteMany({
      where: { product_id: product.id },
    });

    // Delete bids
    await prisma.bid.deleteMany({
      where: { productId: product.id },
    });

    // Delete the product
    await prisma.products.delete({
      where: { id: product.id },
    });

    // Delete related items in the cart
    await prisma.carts.deleteMany({
      where: { product_id: product.id },
    });
    return { success: true };
    // return res.status(200).json({ message: 'Product has been deleted successfully' });
  } catch (error) {
    return { success: false, error };
    // return res.status(500).json({ message: 'Something went wrong', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};


export const updatePublished = async (data: createOrUpdateData) => {
  const { id, status } = req.body;

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
    return { success: true };
    // return res.status(200).json({ message: 'Product status updated successfully' });
  } catch (error) {
    return { success: false, error };
    // return res.status(500).json({ message: 'Something went wrong' });
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


export const getAllProducts = async () => {
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
    // console.error("Error fetching products:", error);
    return { success: false, error };
  }
}

export const getInhouseProducts = async () => {
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
    // console.error("Error fetching products:", error);
    return { success: false, error };
  }
}

export const getDigitalProducts = async () => {
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
    // console.error("Error fetching products:", error);
    return { success: false, error };
  }
}

export const getSellerPhysicalProducts = async () => {
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
    // console.error("Error fetching products:", error);
    return { success: false, error };
  }
}

export const getSellerDigitalProducts = async () => {
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
    // console.error("Error fetching products:", error);
    return { success: false, error };
  }
}


// export const getAllProducts = async (search: string | null = '', page: number = 1) => {
//   const pageSize = 15; // Number of products per page
//   const skip = (page - 1) * pageSize;

//   try {
//     // let whereClause = { auction_product: 1 }; // Only fetch auction products

//     // // If there's a search term, add it to the where clause
//     // if (search) {
//     //   whereClause = {
//     //     ...whereClause,
//     //     name: {
//     //       contains: search,  // Search by product name
//     //       mode: "insensitive",  // Case-insensitive search
//     //     },
//     //   };
//     // }

//     const products = await prisma.products.findMany({
//     //   where: whereClause,
//       orderBy: { created_at: 'desc' },
//       skip,
//       take: pageSize,
//     });

//     // const totalProducts = await prisma.products.count({
//     // //   where: whereClause,
//     // });

//     return {
//       success: true,
//       data: products,
//       pagination: {
//         currentPage: page,
//         // totalPages: Math.ceil(totalProducts / pageSize),
//       },
//       sort_search: search,
//     };
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return { success: false, error: error.message };
//   }
// };

export const getAuctionProductDetails = async (data: createOrUpdateData) => {
  const { slug } = req.query;

  try {
    const detailedProduct = await prisma.products.findUnique({
      where: { slug: slug as string },
    });

    if (detailedProduct) {
      return { success: true, data: detailedProduct };
      // return res.status(200).json(detailedProduct);
    } else {
      // return res.status(404).json({ message: 'Product not found' });
      return { success: false, error };
    }
  } catch (error) {
    return { success: false, error };
    // return res.status(500).json({ message: 'Something went wrong', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

export const getUserPurchaseHistory = async (data: createOrUpdateData) => {
  const session = await getSession({ req });

  if (!session) {
    return { success: false, error };
    // return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  try {
    const orders = await prisma.order_details.findMany({
      where: {
        orders: {
          user_id: userId,
        },
        product: {
          auctionProduct: true,
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
    return { success: true, data: orders };
    // return res.status(200).json(orders);
  } catch (error) {
    return { success: false, error };
    // return res.status(500).json({ message: 'Something went wrong' });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAuctionProductOrders = async () => {
  const { payment_status, delivery_status, search, date } = req.query;

  const filters: any = {
    orderDetails: {
      some: {
        product: {
          auctionProduct: true
        }
      }
    }
  };

  if (payment_status) filters.paymentStatus = payment_status as string;
  if (delivery_status) filters.deliveryStatus = delivery_status as string;
  if (search) filters.code = { contains: search as string };
  if (date) {
    const [startDate, endDate] = (date as string).split(' to ');
    filters.createdAt = {
      gte: new Date(startDate),
      lte: new Date(endDate)
    };
  }

  try {
    const orders = await prisma.orders.findMany({
      where: filters,
      orderBy: {
        code: 'desc'
      },
      include: {
        order_details: {
          include: {
            products: true
          }
        }
      }
    });
    return { success: true, data: orders };
  } catch (error) {
    // console.error("Error fetching orders:", error);
    return { success: false, error };
  }
};


export const getAuctionOrderDetails = async (data: createOrUpdateData) => {
  // const { id } = req.query;

  try {
    const decryptedId = data.id; // Replace with your decryption logic if needed
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
      // return res.status(404).json({ error: 'Order not found' });
      return { success: false, error };
    }

    const orderShippingAddress = order.shipping_address;
    const deliveryBoys = await prisma.user.findMany({
      where: {
        city: orderShippingAddress.city,
        userType: 'delivery_boy'
      }
    });

    await prisma.order.update({
      where: { id: decryptedId },
      data: { viewed: true }
    });
    return { success: true, data: order, deliveryBoys };
    // res.status(200).json({ order, deliveryBoys });
  } catch (error) {
    // res.status(500).json({ error: 'Internal server error' });
    return { success: false, error };
  }
};