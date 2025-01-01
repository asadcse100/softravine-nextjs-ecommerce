
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  name: string;
  published: number;
  user_id: number;
  category_id: number;
  subcategory_id: number;
  subsubcategory_id: number;
  brand_id: number;
  status: number;
  added_by: string;
  photos: string;
  thumbnail_img: string;
  conditon: string;
  location: string;
  video_provider: string;
  video_link: string;
  unit: string;
  tags: string;
  description: string;
  unit_price: number;
  meta_title: string;
  meta_description: string;
  meta_img: string;
  pdf: string;
  slug: string;
  created_at?: string;
};

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

// export const getCustomerProducts = async () => {
//   try{
//       const customer_products = await prisma.customer_products.findMany();
//       return { success: true, data: customer_products };
//   }catch(error){
//       console.error("Error fetching customer_products:", error);
//       return { success: false, error };
//   }
// }

export const getCustomerProductById = async (id: number) => {
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
    // console.error("Error category:", error);
    return { success: false, error };
  }
};

export const getCustomerProducts = async () => {
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

// export const getCustomerProducts = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//       // Retrieve customer products
//       const products = await prisma.customer_products.findMany({
//         orderBy: {
//           created_at: 'desc',
//         },
//       });

//       res.status(200).json(products);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to retrieve customer products' });
//     }
//   };

// export const createOrUpdateCustomerProduct = async () => {
//   try {
//     const {
//       name,
//       added_by,
//       category_id,
//       brand_id,
//       condition,
//       location,
//       photos,
//       thumbnail_img,
//       unit,
//       tags,
//       description,
//       video_provider,
//       video_link,
//       unit_price,
//       meta_title,
//       meta_description,
//       meta_img,
//       pdf,
//     } = req.body;

//     // Save customer product
//     const customerProduct = await prisma.customer_products.create({
//       data: {
//         name,
//         added_by,
//         user_id: req.users.id,
//         category_id,
//         brand_id,
//         condition,
//         location,
//         photos,
//         thumbnail_img,
//         unit,
//         tags: tags.join(','),
//         description,
//         video_provider,
//         video_link,
//         unit_price,
//         meta_title,
//         meta_description,
//         meta_img,
//         pdf,
//         slug: YOUR_SLUG_GENERATION_LOGIC, // Replace YOUR_SLUG_GENERATION_LOGIC with actual slug generation logic
//       },
//     });

//     // Update user's remaining uploads
//     await prisma.users.update({
//       where: {
//         id: req.users.id,
//       },
//       data: {
//         remaining_uploads: {
//           decrement: 1,
//         },
//       },
//     });

//     // Save customer product translation
//     await prisma.customerProductTranslation.create({
//       data: {
//         lang: YOUR_DEFAULT_LANGUAGE,
//         customer_product_id: customerProduct.id,
//         name,
//         unit,
//         description,
//       },
//     });

//     res.status(201).json({ message: 'Product has been inserted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createOrUpdateCustomerProduct(data: createOrUpdateData) {
  try {
    // Generate a slug
    const slug = generateSlug(data.name);
    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.customer_products.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        name: data.name,
        published: data.published,
        user_id: data.user_id,
        category_id: data.category_id,
        subcategory_id: data.subcategory_id,
        subsubcategory_id: data.subsubcategory_id,
        brand_id: data.brand_id,
        added_by: data.added_by,
        photos: data.photos,
        conditon: data.conditon,
        location: data.location,
        thumbnail_img: data.thumbnail_img,
        video_provider: data.video_provider,
        video_link: data.video_link,
        unit: data.unit,
        tags: data.tags,
        description: data.description,
        unit_price: data.unit_price,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        meta_img: data.meta_img,
        pdf: data.pdf,
        slug: data.slug,
        updated_at: data.created_at,
      },
      create: {
        name: data.name,
        published: data.published,
        user_id: data.user_id,
        category_id: data.category_id,
        subcategory_id: data.subcategory_id,
        subsubcategory_id: data.subsubcategory_id,
        brand_id: data.brand_id,
        added_by: data.added_by,
        photos: data.photos,
        conditon: data.conditon,
        location: data.location,
        thumbnail_img: data.thumbnail_img,
        video_provider: data.video_provider,
        video_link: data.video_link,
        unit: data.unit,
        tags: data.tags,
        description: data.description,
        unit_price: data.unit_price,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        meta_img: data.meta_img,
        pdf: data.pdf,
        slug: data.slug,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    // console.error("Error creating Customer Package:", error);
    return { success: false, error };
  }
};


// export const updateCustomerProduct = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { id } = req.query;
//     const {
//       name,
//       unit,
//       description,
//       status,
//       category_id,
//       brand_id,
//       condition,
//       location,
//       photos,
//       thumbnail_img,
//       tags,
//       video_provider,
//       video_link,
//       unit_price,
//       meta_title,
//       meta_description,
//       meta_img,
//       pdf,
//       slug,
//       lang,
//     } = req.body;

//     const customerProduct = await prisma.customerProduct.update({
//       where: { id: Number(id) },
//       data: {
//         name,
//         unit,
//         description,
//         status,
//         user_id: req.user.id,
//         category_id,
//         brand_id,
//         condition,
//         location,
//         photos,
//         thumbnail_img,
//         tags: tags.join(','),
//         video_provider,
//         video_link,
//         unit_price,
//         meta_title,
//         meta_description,
//         meta_img,
//         pdf,
//         slug: slug.toLowerCase(),
//       },
//     });

//     // Save customer product translation
//     await prisma.customerProductTranslation.upsert({
//       where: {
//         lang_customer_product_id: { lang, customer_product_id: Number(id) },
//       },
//       create: {
//         lang,
//         customer_product_id: customerProduct.id,
//         name,
//         unit,
//         description,
//       },
//       update: {
//         name,
//         unit,
//         description,
//       },
//     });

//     res.status(200).json({ message: 'Product has been updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// };

export const updateStatus = async (data: createOrUpdateData) => {
  //   export default async function updateStatus(req: NextApiRequest, res: NextApiResponse) {
  // const { id, status } = req.body;
  const id = data.id;
  const status = data.status;

  try {
    const product = await prisma.customer_products.update({
      where: { id: Number(id) },
      data: { status },
    });

    if (product) {
      return { success: true, data: product };
      // return res.status(200).json({ status: 1 });
    } else {
      // return res.status(404).json({ status: 0 });
      return { success: false };
    }
  } catch (error) {
    // console.error('Error updating product status:', error);
    // return res.status(500).json({ status: 0 });
    return { success: false };
  }
};

export const destroy = async (data: createOrUpdateData) => {
  //   export default async function destroy(req: NextApiRequest, res: NextApiResponse) {
  // const { id } = req.query;
  const id = data.id;

  try {
    const product = await prisma.customer_products.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return { success: false, error: "Product not found!" };
      // return res.status(404).json({ message: 'Product not found' });
    }

    await prisma.customer_product_translations.deleteMany({
      where: { customer_product_id: Number(id) },
    });

    const deleteCustomerProduct = await prisma.customer_products.delete({ where: { id: Number(id) } });
    return { success: true, data: deleteCustomerProduct };
    // return res.status(200).json({ message: 'Product has been deleted successfully' });
  } catch (error) {
    // console.error('Error deleting product:', error);
    return { success: false, error };
    // return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePublished = async (data: createOrUpdateData) => {
  //   export default async function updatePublished(req: NextApiRequest, res: NextApiResponse) {
  // const { id, status } = req.body;
  const id = data.id;
  const status = data.status;

  try {
    const product = await prisma.customer_products.update({
      where: { id: Number(id) },
      data: { published: status },
    });

    if (product) {
      return { success: true, data: product };
      // return res.status(200).json({ status: 1 });
    } else {
      return { success: false };
      // return res.status(404).json({ status: 0 });
    }
  } catch (error) {
    return { success: false, error };
    // console.error('Error updating product published status:', error);
    // return res.status(500).json({ status: 0 });
  }
};

export const customerProduct = async (data: createOrUpdateData) => {
  //   export default async function customerProduct(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = "AAAA";

  try {
    const customerProduct = await prisma.customer_products.findUnique({
      where: { slug: String(slug) },
    });

    if (!customerProduct || customerProduct.status !== 'published') {
      return res.redirect('/');
    }

    return { success: true, data: customerProduct };
    // return res.render('frontend.customer_product_details', { customerProduct });
  } catch (error) {
    return { success: false, error };
    // console.error('Error fetching customer product:', error);
    // return res.status(500).send('Internal Server Error');
  }
};

export const search = async (data: createOrUpdateData) => {
  //   export default async function search(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { brand, category, sort_by, condition } = req.query;

    // Check if classified products setting is enabled
    // Assuming get_setting() is a function to retrieve settings
    if (get_setting('classified_product') !== 1) {
      return res.redirect('/');
    }

    // Get brand and category IDs from slugs
    const brandId = await prisma.brands.findUnique({
      where: { slug: String(brand) },
      select: { id: true },
    });

    const categoryId = await prisma.categories.findUnique({
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
    let query = prisma.customer_products.findMany({
      where: conditions,
      include: { brands: true, categories: true },
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
    return { success: true, data: customerProducts, category_id: categoryId?.id, brand_id: brandId?.id, sort_by, condition };
    // return res.render('frontend.customer_product_listing', { customerProducts, category_id: categoryId?.id, brand_id: brandId?.id, sort_by, condition });
  } catch (error) {
    return { success: false, error };
    // console.error('Error searching customer products:', error);
    // return res.status(500).send('Internal Server Error');
  }
}

async function getCategoryChildrenIds(categoryId: number): Promise<number[]> {
  // Logic to retrieve category children IDs
}