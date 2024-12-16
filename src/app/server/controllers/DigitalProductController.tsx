// controllers/productController.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
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
interface ProductRequest {
    name: string;
    unit_price: number;
    category_ids: number[];
    tax_id?: number;
    tax?: number;
    tax_type?: string;
    unit: string;
    description: string;
    lang: string;
  }

export const getDigitalProducts = async (search: string | undefined) => {
  const products = await prisma.products.findMany({
    where: {
      added_by: 'admin',
      digital: 1,
      name: {
        contains: search ?? '',
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return products;
};

  
  export const storeProduct = async (request: ProductRequest) => {
    const { name, unit_price, category_ids, tax_id, tax, tax_type, unit, description } = request;
  
    // Store Product
    const product = await prisma.products.create({
      data: {
        name,
        addedBy: 'admin',
        digital: true,
      },
    });
  
    // Attach categories
    await prisma.products.update({
      where: { id: product.id },
      data: {
        categories: {
          connect: category_ids.map(id => ({ id })),
        },
      },
    });
  
    // Store Product Stock
    await prisma.product_stocks.create({
      data: {
        unit_prices: unit_price,
        currentStock: 0,
        productId: product.id,
      },
    });
  
    // Store VAT & Tax
    if (tax_id) {
      await prisma.product_taxs.create({
        data: {
          taxId: tax_id,
          tax: tax!,
          taxType: tax_type!,
          productId: product.id,
        },
      });
    }
  
    // Store Product Translation
    await prisma.product_translations.create({
      data: {
        lang: process.env.DEFAULT_LANGUAGE || 'en',
        name,
        unit,
        description,
        product_id: product.id,
      },
    });
  
    return product;
  };

  export const updateProduct = async (id: number, request: ProductRequest) => {
    const { name, unit_price, category_ids, tax_id, tax, tax_type, unit, description, lang } = request;
  
    // Find product
    const product = await prisma.products.findUnique({
      where: { id },
      include: {
        product_stocks: true,
        product_taxes: true,
      },
    });
  
    if (!product) {
      throw new Error('Product not found');
    }
  
    // Update Product
    const updatedProduct = await prisma.products.update({
      where: { id },
      data: {
        name,
      },
    });
  
    // Delete existing stocks
    await prisma.product_stocks.deleteMany({
      where: { productId: id },
    });
  
    // Attach categories
    await prisma.products.update({
      where: { id },
      data: {
        categories: {
          set: category_ids.map(id => ({ id })),
        },
      },
    });
  
    // Store Product Stock
    await prisma.product_stocks.create({
      data: {
        unit_prices: unit_price,
        currentStock: 0,
        productId: id,
      },
    });
  
    // Delete existing tax records
    await prisma.product_taxs.deleteMany({
      where: { productId: id },
    });
  
    // Store VAT & Tax
    if (tax_id) {
      await prisma.product_taxs.create({
        data: {
          taxId: tax_id,
          tax: tax!,
          taxType: tax_type!,
          productId: id,
        },
      });
    }
  
    // Update or Create Product Translation
    await prisma.product_translations.upsert({
      where: {
        product_id_langs: {
          productId: id,
          lang,
        },
      },
      update: {
        name,
        description,
      },
      create: {
        lang,
        name,
        unit,
        description,
        product_id: id,
      },
    });
  
    return updatedProduct;
  };


export const deleteProduct = async (id: number) => {
  // Delete the product
  await prisma.products.delete({
    where: { id },
  });
};
