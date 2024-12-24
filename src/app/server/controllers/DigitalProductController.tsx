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
  tax_type?: string[];
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

  
  // export const storeProduct = async (request: ProductRequest) => {
  //   const { name, unit_price, category_ids, tax_id, tax, tax_type, unit, description } = request;
  
  //   // Store Product
  //   const product = await prisma.products.create({
  //     data: {
  //       name,
  //       addedBy: 'admin',
  //       digital: true,
  //     },
  //   });
  
  //   // Attach categories
  //   await prisma.products.update({
  //     where: { id: product.id },
  //     data: {
  //       categories: {
  //         connect: category_ids.map(id => ({ id })),
  //       },
  //     },
  //   });
  
  //   // Store Product Stock
  //   await prisma.product_stocks.create({
  //     data: {
  //       unit_prices: unit_price,
  //       currentStock: 0,
  //       productId: product.id,
  //     },
  //   });
  
  //   // Store VAT & Tax
  //   if (tax_id) {
  //     await prisma.product_taxs.create({
  //       data: {
  //         taxId: tax_id,
  //         tax: tax!,
  //         taxType: tax_type!,
  //         productId: product.id,
  //       },
  //     });
  //   }
  
  //   // Store Product Translation
  //   await prisma.product_translations.create({
  //     data: {
  //       lang: process.env.DEFAULT_LANGUAGE || 'en',
  //       name,
  //       unit,
  //       description,
  //       product_id: product.id,
  //     },
  //   });
  
  //   return product;
  // };

 
 // Utility function to generate slugs
 function generateSlug(input: string): string {
   return input
     .toLowerCase()
     .replace(/[^a-z0-9]+/g, "-")
     .replace(/(^-|-$)/g, "");
 }
 
 export async function createOrUpdateDigitalProduct(data: createOrUpdateData) {
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
     console.error("Error creating or updating blog category:", error);
     return { success: false, error: error.message || "An unexpected error occurred" };
   }
 }

  // export const updateProduct = async (id: number, request: ProductRequest) => {
  //   const { name, unit_price, category_ids, tax_id, tax, tax_type, unit, description, lang } = request;
  
  //   // Find product
  //   const product = await prisma.products.findUnique({
  //     where: { id },
  //     include: {
  //       product_stocks: true,
  //       product_taxes: true,
  //     },
  //   });
  
  //   if (!product) {
  //     throw new Error('Product not found');
  //   }
  
  //   // Update Product
  //   const updatedProduct = await prisma.products.update({
  //     where: { id },
  //     data: {
  //       name,
  //     },
  //   });
  
  //   // Delete existing stocks
  //   await prisma.product_stocks.deleteMany({
  //     where: { product_id: id },
  //   });
  
  //   // Attach categories
  //   await prisma.products.update({
  //     where: { id },
  //     data: {
  //       categories: {
  //         set: category_ids.map(id => ({ id })),
  //       },
  //     },
  //   });
  
  //   // Store Product Stock
  //   await prisma.product_stocks.create({
  //     data: {
  //       unit_prices: unit_price,
  //       currentStock: 0,
  //       productId: id,
  //     },
  //   });
  
  //   // Delete existing tax records
  //   await prisma.product_taxs.deleteMany({
  //     where: { productId: id },
  //   });
  
  //   // Store VAT & Tax
  //   if (tax_id) {
  //     await prisma.product_taxs.create({
  //       data: {
  //         taxId: tax_id,
  //         tax: tax!,
  //         taxType: tax_type!,
  //         productId: id,
  //       },
  //     });
  //   }
  
  //   // Update or Create Product Translation
  //   await prisma.product_translations.upsert({
  //     where: {
  //       product_id_langs: {
  //         productId: id,
  //         lang,
  //       },
  //     },
  //     update: {
  //       name,
  //       description,
  //     },
  //     create: {
  //       lang,
  //       name,
  //       unit,
  //       description,
  //       product_id: id,
  //     },
  //   });
  
  //   return updatedProduct;
  // };


// export const deleteProduct = async (id: number) => {
//   // Delete the product
//   await prisma.products.delete({
//     where: { id },
//   });
// };

  
  export const deleteProduct = async (id: number) => {
    try {
      // Check if the record exists
      const existingProducts = await prisma.products.findUnique({
        where: { id },
      });
  
      if (!existingProducts) {
        return { success: false, error: "Record does not exist." };
      }
  
      const deletedProducts = await prisma.products.delete({
        where: { id },
      });
      return { success: true, data: deletedProducts };
    } catch (error) {
      console.error("Error deleting Product:", error);
      return { success: false, error };
    }
  };
