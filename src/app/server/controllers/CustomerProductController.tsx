import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export const getUserProducts = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const userId = YOUR_USER_ID; // Replace YOUR_USER_ID with actual user ID

//     // Check if classified product is enabled
//     const classifiedProductEnabled = await prisma.setting.findUnique({
//       where: {
//         key: 'classified_product',
//       },
//     });

//     // If classified product is not enabled, redirect to dashboard
//     if (!classifiedProductEnabled || classifiedProductEnabled.value !== '1') {
//       res.redirect('/dashboard');
//       return;
//     }

//     // Retrieve user's products
//     const products = await prisma.customerProduct.findMany({
//       where: {
//         user_id: userId,
//       },
//       orderBy: {
//         created_at: 'desc',
//       },
//     });

//     res.status(200).json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to retrieve user products' });
//   }
// };

export const getUserProducts = async () => {
  try{
      const products = await prisma.products.findMany();
      return { success: true, data: products };
  }catch(error){
      console.error("Error fetching products:", error);
      return { success: false, error };
  }
}

export const getCustomerProducts = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Retrieve customer products
      const products = await prisma.customerProduct.findMany({
        orderBy: {
          created_at: 'desc',
        },
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve customer products' });
    }
  };

  export const storeCustomerProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const {
        name,
        added_by,
        category_id,
        brand_id,
        condition,
        location,
        photos,
        thumbnail_img,
        unit,
        tags,
        description,
        video_provider,
        video_link,
        unit_price,
        meta_title,
        meta_description,
        meta_img,
        pdf,
      } = req.body;
  
      // Save customer product
      const customerProduct = await prisma.customerProduct.create({
        data: {
          name,
          added_by,
          user_id: req.user.id,
          category_id,
          brand_id,
          condition,
          location,
          photos,
          thumbnail_img,
          unit,
          tags: tags.join(','),
          description,
          video_provider,
          video_link,
          unit_price,
          meta_title,
          meta_description,
          meta_img,
          pdf,
          slug: YOUR_SLUG_GENERATION_LOGIC, // Replace YOUR_SLUG_GENERATION_LOGIC with actual slug generation logic
        },
      });
  
      // Update user's remaining uploads
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          remaining_uploads: {
            decrement: 1,
          },
        },
      });
  
      // Save customer product translation
      await prisma.customerProductTranslation.create({
        data: {
          lang: YOUR_DEFAULT_LANGUAGE,
          customer_product_id: customerProduct.id,
          name,
          unit,
          description,
        },
      });
  
      res.status(201).json({ message: 'Product has been inserted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  export const updateCustomerProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;
      const {
        name,
        unit,
        description,
        status,
        category_id,
        brand_id,
        condition,
        location,
        photos,
        thumbnail_img,
        tags,
        video_provider,
        video_link,
        unit_price,
        meta_title,
        meta_description,
        meta_img,
        pdf,
        slug,
        lang,
      } = req.body;
  
      const customerProduct = await prisma.customerProduct.update({
        where: { id: Number(id) },
        data: {
          name,
          unit,
          description,
          status,
          user_id: req.user.id,
          category_id,
          brand_id,
          condition,
          location,
          photos,
          thumbnail_img,
          tags: tags.join(','),
          video_provider,
          video_link,
          unit_price,
          meta_title,
          meta_description,
          meta_img,
          pdf,
          slug: slug.toLowerCase(),
        },
      });
  
      // Save customer product translation
      await prisma.customerProductTranslation.upsert({
        where: {
          lang_customer_product_id: { lang, customer_product_id: Number(id) },
        },
        create: {
          lang,
          customer_product_id: customerProduct.id,
          name,
          unit,
          description,
        },
        update: {
          name,
          unit,
          description,
        },
      });
  
      res.status(200).json({ message: 'Product has been updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  export const updateStatus = async (req: NextApiRequest, res: NextApiResponse) => {
//   export default async function updateStatus(req: NextApiRequest, res: NextApiResponse) {
    const { id, status } = req.body;
  
    try {
      const product = await prisma.customerProduct.update({
        where: { id: Number(id) },
        data: { status },
      });
  
      if (product) {
        return res.status(200).json({ status: 1 });
      } else {
        return res.status(404).json({ status: 0 });
      }
    } catch (error) {
      console.error('Error updating product status:', error);
      return res.status(500).json({ status: 0 });
    }
  };

  export const destroy = async (req: NextApiRequest, res: NextApiResponse) => {
//   export default async function destroy(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
  
    try {
      const product = await prisma.customerProduct.findUnique({
        where: { id: Number(id) },
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await prisma.customerProductTranslation.deleteMany({
        where: { customerProductId: Number(id) },
      });
  
      await prisma.customerProduct.delete({ where: { id: Number(id) } });
  
      return res.status(200).json({ message: 'Product has been deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const updatePublished = async (req: NextApiRequest, res: NextApiResponse) => {
//   export default async function updatePublished(req: NextApiRequest, res: NextApiResponse) {
    const { id, status } = req.body;
  
    try {
      const product = await prisma.customerProduct.update({
        where: { id: Number(id) },
        data: { published: status },
      });
  
      if (product) {
        return res.status(200).json({ status: 1 });
      } else {
        return res.status(404).json({ status: 0 });
      }
    } catch (error) {
      console.error('Error updating product published status:', error);
      return res.status(500).json({ status: 0 });
    }
  };
  
  export const customerProduct = async (req: NextApiRequest, res: NextApiResponse) => {
//   export default async function customerProduct(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;
  
    try {
      const customerProduct = await prisma.customerProduct.findUnique({
        where: { slug: String(slug) },
      });
  
      if (!customerProduct || customerProduct.status !== 'published') {
        return res.redirect('/');
      }
  
      return res.render('frontend.customer_product_details', { customerProduct });
    } catch (error) {
      console.error('Error fetching customer product:', error);
      return res.status(500).send('Internal Server Error');
    }
  };

  export const search = async (req: NextApiRequest, res: NextApiResponse) => {
//   export default async function search(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { brand, category, sort_by, condition } = req.query;
  
      // Check if classified products setting is enabled
      // Assuming get_setting() is a function to retrieve settings
      if (get_setting('classified_product') !== 1) {
        return res.redirect('/');
      }
  
      // Get brand and category IDs from slugs
      const brandId = await prisma.brand.findUnique({
        where: { slug: String(brand) },
        select: { id: true },
      });
  
      const categoryId = await prisma.category.findUnique({
        where: { slug: String(category) },
        select: { id: true },
      });
  
      // Build conditions object
      const conditions: any = { published: true, status: true };
  
      if (brandId) {
        conditions.brandId = brandId.id;
      }
  
      if (categoryId) {
        const categoryIds = await getCategoryChildrenIds(categoryId.id);
        conditions.categoryId = { in: categoryIds };
      }
  
      // Start building the query
      let query = prisma.customerProduct.findMany({
        where: conditions,
        include: { brand: true, category: true },
      });
  
      // Apply sorting
      if (sort_by) {
        switch (sort_by) {
          case '1':
            query = query.orderBy({ created_at: 'desc' });
            break;
          case '2':
            query = query.orderBy({ created_at: 'asc' });
            break;
          case '3':
            query = query.orderBy({ unit_price: 'asc' });
            break;
          case '4':
            query = query.orderBy({ unit_price: 'desc' });
            break;
          case '5':
            query = query.where({ condition: 'new' });
            break;
          case '6':
            query = query.where({ condition: 'used' });
            break;
          default:
            // code...
            break;
        }
      }
  
      // Apply additional condition filtering
      if (condition) {
        query = query.where({ condition });
      }
  
      // Paginate the results
      const customerProducts = await query.take(12).skip(0);
  
      return res.render('frontend.customer_product_listing', { customerProducts, category_id: categoryId?.id, brand_id: brandId?.id, sort_by, condition });
    } catch (error) {
      console.error('Error searching customer products:', error);
      return res.status(500).send('Internal Server Error');
    }
  }
  
  async function getCategoryChildrenIds(categoryId: number): Promise<number[]> {
    // Logic to retrieve category children IDs
  }