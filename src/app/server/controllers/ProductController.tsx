import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";
import { getProductById, updateProduct } from '../models/AuctionProduct';
import { slugify } from '@/app/server/utils/slugify';  // Utility function for generating slugs
import { Product } from '@/app/server/types/product';
import { parseISO, differenceInDays } from 'date-fns';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export const getSellerProductsById = async () => {
  try{
      const products = await prisma.products.findMany();
      return { success: true, data: products };
  }catch(error){
      console.error("Error fetching products:", error);
      return { success: false, error };
  }
}


export const createAuctionProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    name,
    addedBy,
    categoryId,
    brandId,
    barcode,
    startingBid,
    refundable,
    photos,
    thumbnailImg,
    tags,
    description,
    videoProvider,
    videoLink,
    auctionDateRange,
    shippingType,
    estShippingDays,
    earnPoint,
    shippingCost,
    isQuantityMultiplied,
    metaTitle,
    metaDescription,
    metaImg,
    pdf,
    cashOnDelivery,
    todaysDeal,
    sku,
    tax_id,
    tax,
    tax_type
  } = req.body;

  try {
    const user = await prisma.user.findFirst({ where: { userType: 'admin' } });
    if (!user) return res.status(404).json({ error: 'Admin user not found' });

    const product = await prisma.product.create({
      data: {
        name,
        addedBy,
        userId: user.id,
        auctionProduct: true,
        categoryId,
        brandId,
        barcode,
        startingBid,
        refundable: refundable || false,
        photos,
        thumbnailImg,
        tags,
        description,
        videoProvider,
        videoLink,
        auctionStartDate: auctionDateRange ? new Date(auctionDateRange[0]) : null,
        auctionEndDate: auctionDateRange ? new Date(auctionDateRange[1]) : null,
        shippingType,
        estShippingDays,
        earnPoint,
        shippingCost,
        isQuantityMultiplied: !!isQuantityMultiplied,
        metaTitle: metaTitle || name,
        metaDescription: metaDescription || description,
        metaImg: metaImg || thumbnailImg,
        pdf,
        cashOnDelivery: !!cashOnDelivery,
        todaysDeal: !!todaysDeal,
        slug: slugify(name)
      }
    });

    if (tax_id) {
      for (let i = 0; i < tax_id.length; i++) {
        await prisma.productTax.create({
          data: {
            productId: product.id,
            taxId: tax_id[i],
            tax: tax[i],
            taxType: tax_type[i]
          }
        });
      }
    }

    res.status(201).json({ message: 'Product has been inserted successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the product' });
  }
};


export const updateAuctionProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const {
    categoryId, brandId, barcode, cashOnDelivery, isQuantityMultiplied,
    refundable, lang, name, unit, description, slug, photos, thumbnailImg,
    tags, videoProvider, videoLink, startingBid, auctionDateRange,
    shippingType, estShippingDays, earnPoint, flatShippingCost,
    shippingCost, metaTitle, metaDescription, metaImg, pdf, tax_id, tax,
    tax_type
  } = req.body as Product;

  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        categoryId,
        brandId,
        barcode,
        cashOnDelivery: cashOnDelivery || false,
        isQuantityMultiplied: isQuantityMultiplied || false,
        refundable: refundable || false,
        photos,
        thumbnailImg,
        tags: tags ? tags.join(',') : undefined,
        videoProvider,
        videoLink,
        startingBid: startingBid ? parseFloat(startingBid) : undefined,
        auctionStartDate: auctionDateRange ? new Date(auctionDateRange[0]) : undefined,
        auctionEndDate: auctionDateRange ? new Date(auctionDateRange[1]) : undefined,
        shippingType,
        estShippingDays,
        earnPoint: earnPoint ? parseInt(earnPoint) : undefined,
        shippingCost: shippingType === 'free' ? 0 : shippingType === 'flat_rate' ? flatShippingCost : JSON.stringify(shippingCost),
        metaTitle: metaTitle || name,
        metaDescription: metaDescription || description,
        metaImg: metaImg || thumbnailImg,
        pdf,
        colors: JSON.stringify([]),
        attributes: JSON.stringify([]),
        choiceOptions: JSON.stringify([])
      }
    });

    await prisma.productTranslation.upsert({
      where: { productId_lang: { productId: product.id, lang } },
      update: { name, unit, description },
      create: { productId: product.id, lang, name, unit, description }
    });

    await prisma.productTax.deleteMany({ where: { productId: product.id } });
    if (tax_id && tax && tax_type) {
      for (let i = 0; i < tax_id.length; i++) {
        await prisma.productTax.create({
          data: {
            productId: product.id,
            taxId: tax_id[i],
            tax: parseFloat(tax[i]),
            taxType: tax_type[i]
          }
        });
      }
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const product = await prisma.product.findUnique({
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
    await prisma.productTranslation.deleteMany({
      where: { productId: product.id },
    });

    // Delete bids
    await prisma.bid.deleteMany({
      where: { productId: product.id },
    });

    // Delete the product
    await prisma.product.delete({
      where: { id: product.id },
    });

    // Delete related items in the cart
    await prisma.cart.deleteMany({
      where: { productId: product.id },
    });

    return res.status(200).json({ message: 'Product has been deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};


export const updatePublished = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, status } = req.body;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          include: {
            seller: true,
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
      const seller = product.user.seller;
      if (seller?.invalidAt && differenceInDays(new Date(), parseISO(seller.invalidAt)) <= 0) {
        return res.status(403).json({ message: 'Seller subscription invalid' });
      }
    }

    await prisma.product.update({
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


export const getAllProducts = async () => {
  try{
      const products = await prisma.products.findMany();
      return { success: true, data: products };
  }catch(error){
      console.error("Error fetching products:", error);
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

export const getAuctionProductDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  try {
    const detailedProduct = await prisma.product.findUnique({
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

export const getUserPurchaseHistory = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  try {
    const orders = await prisma.orderDetails.findMany({
      where: {
        order: {
          userId: userId,
        },
        product: {
          auctionProduct: true,
        },
      },
      orderBy: {
        order: {
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
        orderDetails: {
          include: {
            product: true
          }
        }
      }
    });
    return { success: true, data: orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error };
  }
};


export const getAuctionOrderDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const decryptedId = parseInt(id as string); // Replace with your decryption logic if needed
    const order = await prisma.order.findUnique({
      where: { id: decryptedId },
      include: {
        orderDetails: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const orderShippingAddress = order.shippingAddress;
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

    res.status(200).json({ order, deliveryBoys });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};