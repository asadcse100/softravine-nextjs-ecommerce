// controllers/flashDealController.ts
import { PrismaClient } from '@prisma/client';
import { slugify, randomString } from '@/app/server/utils/FlashDeal';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  flash_deal_id: number;
  product_id: number;
  discount: number;
  discount_type: string;
  created_at?: string;
};
interface FlashDealRequest {
    id: number;
    title: string;
    text_color: string;
    date_range: string;
    background_color: string;
    banner: string;
    products: number[];
    [key: string]: any;
    lang: string;
  }

// export const getFlashDeals = async () => {
//   let search: string | undefined;
//     const where = search ? {
//       title: {
//         contains: search,
//         mode: 'insensitive',
//       },
//     } : {};
  
//     const flashDeals = await prisma.flash_deals.findMany({
//       where,
//       orderBy: {
//         created_at: 'desc',
//       },
//     });
  
//     return flashDeals;
//   };

export const getFlashDeals = async () => {
  try{
      const flash_deals = await prisma.flash_deals.findMany();
      return { success: true, data: flash_deals };
  }catch(error){
      console.error("Error fetching flash_deals:", error);
      return { success: false, error };
  }
}

  export const createFlashDeal = async (req: FlashDealRequest) => {
    const { title, text_color, date_range, background_color, banner, products } = req;
  
    const dateVar = date_range.split(" to ");
    const startDate = Math.floor(new Date(dateVar[0]).getTime() / 1000);
    const endDate = Math.floor(new Date(dateVar[1]).getTime() / 1000);
    
    const slug = `${slugify(title)}-${randomString(5)}`;
  
    const flashDeal = await prisma.flash_deals.create({
      data: {
        title,
        text_color: text_color,
        start_date,
        endDate,
        backgroundColor: background_color,
        slug,
        banner,
      },
    });
  
    for (const productId of products) {
      await prisma.flash_deal_products.create({
        data: {
          flashDealId: flashDeal.id,
          productId: productId,
        },
      });
  
      const discountKey = `discount_${productId}`;
      const discountTypeKey = `discount_type_${productId}`;
  
      await prisma.products.update({
        where: { id: productId },
        data: {
          discount: parseFloat(req[discountKey]),
          discountType: req[discountTypeKey],
          discountStartDate: startDate,
          discountEndDate: endDate,
        },
      });
    }
  
    await prisma.flashDealTranslation.upsert({
      where: {
        lang_flashDealId: {
          lang: process.env.DEFAULT_LANGUAGE!,
          flashDealId: flashDeal.id,
        },
      },
      update: {
        title,
      },
      create: {
        lang: process.env.DEFAULT_LANGUAGE!,
        title,
        flashDealId: flashDeal.id,
      },
    });
  
    return flashDeal;
  };

  export const updateFlashDeal = async (req: FlashDealRequest) => {
    const { id, title, text_color, date_range, background_color, banner, products, lang } = req;
  
    const flashDeal = await prisma.flash_deals.findUnique({ where: { id } });
    if (!flashDeal) throw new Error('Flash Deal not found');
  
    const dateVar = date_range.split(" to ");
    const startDate = Math.floor(new Date(dateVar[0]).getTime() / 1000);
    const endDate = Math.floor(new Date(dateVar[1]).getTime() / 1000);
  
    const updatedFlashDeal = await prisma.flash_deals.update({
      where: { id },
      data: {
        textColor: text_color,
        startDate,
        endDate,
        backgroundColor: background_color,
        ...(lang === process.env.DEFAULT_LANGUAGE && {
          title,
          slug: !flashDeal.slug || flashDeal.title !== title ? `${slugify(title)}-${randomString(5)}` : flashDeal.slug,
        }),
        banner,
      },
    });
  
    await prisma.flash_deal_products.deleteMany({ where: { flash_deal_id: id } });
  
    for (const productId of products) {
      await prisma.flash_deal_products.create({
        data: {
          flash_deal_id: id,
          product_id,
        },
      });
  
      const discountKey = `discount_${productId}`;
      const discountTypeKey = `discount_type_${productId}`;
  
      await prisma.products.update({
        where: { id: productId },
        data: {
          discount: parseFloat(req[discountKey]),
          discountType: req[discountTypeKey],
          discountStartDate: startDate,
          discountEndDate: endDate,
        },
      });
    }
  
    await prisma.flash_deal_translations.upsert({
      where: {
        lang_flash_deal_id: {
          lang,
          flashDealId: id,
        },
      },
      update: {
        title,
      },
      create: {
        lang,
        title,
        flash_deal_id: id,
      },
    });
  
    return updatedFlashDeal;
  };


  export const deleteFlashDeal = async (id: number) => {
    const flashDeal = await prisma.flash_deals.findUnique({ where: { id } });
    if (!flashDeal) throw new Error('Flash Deal not found');
  
    await prisma.flash_deal_products.deleteMany({ where: { flash_deal_id: id } });
    await prisma.flash_deal_translations.deleteMany({ where: { flash_deal_id: id } });
    await prisma.flash_deals.delete({ where: { id } });
  
    return 'Flash Deal has been deleted successfully';
  };

  export const updateFlashDealStatus = async (id: number, status: number) => {
    const flashDeal = await prisma.flash_deals.findUnique({ where: { id } });
    if (!flashDeal) throw new Error('Flash Deal not found');
  
    const updatedFlashDeal = await prisma.flash_deals.update({
      where: { id },
      data: { status },
    });
  
    return updatedFlashDeal;
  };

  export const updateFlashDealFeatured = async (id: number, featured: number) => {
    await prisma.flash_deals.updateMany({
      where: { featured: 1 },
      data: { featured: 0 },
    });
  
    const updatedFlashDeal = await prisma.flash_deals.update({
      where: { id },
      data: { featured },
    });
  
    return updatedFlashDeal;
  };