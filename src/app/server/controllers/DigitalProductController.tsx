// controllers/productController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


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
