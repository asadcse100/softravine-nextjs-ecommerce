import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { getProductWithDetails } from '@/app/server/utils/productHelpers';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  type: string;
  value: string;
};

export const getData = async (data: createOrUpdateData) => {
    try {
      const lang = getSystemLanguage() ? getSystemLanguage().code : null;

      // Fetch featured categories from Prisma
      const featuredCategories = await prisma.categories.findMany({
        where: {
          featureds: true,
        },
        include: {
          banner_image: true, // Assuming you have a relation set up in Prisma schema
        },
      });

      res.status(200).json({ featuredCategories, lang });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }


// Mock function for getting system language
const getSystemLanguage = () => {
  return { code: 'en' }; // Replace with actual logic to get system language
};


export const loadTodaysDealSection = async (data: createOrUpdateData) => {
    try {
      // Fetch today's deal products from Prisma
      const todaysDealProducts = await prisma.products.findMany({
        where: {
          todays_deal: true,
        },
      });
  
      res.status(200).json({ todaysDealProducts });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const loadNewestProductSection = async (data: createOrUpdateData) => {
    try {
      // Fetch newest products from Prisma
      const newestProducts = await prisma.products.findMany({
        orderBy: {
          created_at: 'desc',
        },
        take: 12,
      });
  
      res.status(200).json({ newestProducts });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const handleDashboard = async (data: createOrUpdateData) => {
    try {
      const session = await getSession({ req });
  
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const user = await prisma.users.findUnique({
        where: {
          email: session.user?.email ?? undefined,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.user_type === 'seller') {
        res.status(200).json({ redirect: '/seller/dashboard' });
      } else if (user.user_type === 'customer') {
        const usersCart = await prisma.cart.findFirst({
          where: {
            userId: user.id,
          },
        });
  
        const message = usersCart
          ? 'You had placed your items in the shopping cart. Try to order before the product quantity runs out.'
          : null;
  
        res.status(200).json({ view: 'customer_dashboard', message });
      } else if (user.user_type === 'delivery_boy') {
        res.status(200).json({ view: 'delivery_boy_dashboard' });
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const handleProfile = async (data: createOrUpdateData) => {
    try {
      const session = await getSession({ req });
  
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const user = await prisma.users.findUnique({
        where: {
          email: session.user?.email ?? undefined,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.user_type === 'seller') {
        res.status(200).json({ redirect: '/seller/profile' });
      } else if (user.user_type === 'delivery_boy') {
        res.status(200).json({ view: 'delivery_boy_profile' });
      } else {
        res.status(200).json({ view: 'user_profile' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const updateUserProfile = async (data: createOrUpdateData) => {
    try {
      const session = await getSession({ req });
  
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      if (process.env.DEMO_MODE === 'On') {
        return res.status(403).json({ message: 'Sorry! the action is not permitted in demo' });
      }
  
      const user = await prisma.users.findUnique({
        where: {
          email: session.user?.email ?? undefined,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const {
        name,
        address,
        country,
        city,
        postal_code,
        phone,
        new_password,
        confirm_password,
        photo,
      } = req.body;
  
      const updatedUser = await prisma.users.update({
        where: { id: user.id },
        data: {
          name,
          address,
          country,
          city,
          postal_code,
          phone,
          avatar_original: photo,
          ...(new_password && new_password === confirm_password
            ? { password: await bcrypt.hash(new_password, 10) }
            : {}),
        },
      });
  
      res.status(200).json({ message: 'Your Profile has been updated successfully!', user: updatedUser });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const getFlashDealDetails = async (data: createOrUpdateData) => {
    try {
      const { slug } = req.query;
  
      const flashDeal = await prisma.flash_deal.findUnique({
        where: { slug: String(slug) },
      });
  
      if (!flashDeal) {
        return res.status(404).json({ message: 'Flash deal not found' });
      }
  
      res.status(200).json({ flashDeal });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const trackOrder = async (data: createOrUpdateData) => {
    try {
      const { order_code } = req.query;
  
      if (!order_code) {
        return res.status(400).json({ message: 'Order code is required' });
      }
  
      const order = await prisma.orders.findUnique({
        where: { code: String(order_code) },
      });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ order });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const getProductDetails = async (data: createOrUpdateData) => {
    try {
      const session = await getSession({ req });
      const { slug, product_referral_code } = req.query;
      
      if (!slug) {
        return res.status(400).json({ message: 'Slug is required' });
      }
  
      const product = await prisma.products.findFirst({
        where: { slug: String(slug), approved: true, auction_product: false },
        include: {
          reviews: true,
          brands: true,
          stocks: true,
          user: { include: { shop: true } },
        },
      });
  
      if (!product || !product.published) {
        return res.status(404).json({ message: 'Product not found or not published' });
      }
  
      if (product.added_by === 'seller') {
        if (!product.user || product.user.banned || process.env.VENDOR_SYSTEM_ACTIVATION !== '1') {
          return res.status(404).json({ message: 'Product not found or vendor system not activated' });
        }
      }
  
      if (product.wholesale_product && !process.env.WHOLESALE_ADDON_ACTIVATED) {
        return res.status(404).json({ message: 'Wholesale addon is not activated' });
      }
  
      const productQueries = await prisma.product_queries.findMany({
        where: { product_id: product.id, customer_id: { not: session?.user?.id || 0 } },
        orderBy: { id: 'desc' },
        take: 3,
      });
      const totalQueryCount = await prisma.product_queries.count({
        where: { product_id: product.id },
      });
      const reviews = await prisma.reviews.findMany({
        where: { product_id: product.id },
        orderBy: { id: 'desc' },
        take: 3,
      });
  
      // Review status
      let reviewStatus = 0;
      if (session) {
        const orderDetail = await prisma.order_details.findFirst({
          where: {
            product_id: product.id,
            delivery_status: 'delivered',
            orders: { user_id: session.users.id },
          },
        });
        reviewStatus = orderDetail ? 1 : 0;
      }
  
      // Handle affiliate referral code
      if (product_referral_code) {
        const validationTime = await prisma.affiliate_configs.findFirst({
          where: { type: 'validation_time' },
        });
        const cookieMinute = validationTime ? validationTime.value * 60 : 30 * 24 * 60;
        res.setHeader('Set-Cookie', [
          `product_referral_code=${product_referral_code}; Max-Age=${cookieMinute}; Path=/`,
          `referred_product_id=${product.id}; Max-Age=${cookieMinute}; Path=/`,
        ]);
  
        const referredByUser = await prisma.user.findFirst({
          where: { referral_code: String(product_referral_code) },
        });
  
        if (referredByUser) {
          // Assuming a processAffiliateStats function exists in some controller
          const affiliateController = new AffiliateController();
          await affiliateController.processAffiliateStats(referredByUser.id, 1, 0, 0, 0);
        }
      }
  
      res.status(200).json({
        product,
        productQueries,
        totalQueryCount,
        reviews,
        reviewStatus,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const getShopDetails = async (data: createOrUpdateData) => {
    try {
      const { slug } = req.query;
  
      if (process.env.VENDOR_SYSTEM_ACTIVATION !== '1') {
        return res.status(403).json({ message: 'Vendor system is not activated' });
      }
  
      const shop = await prisma.shops.findFirst({
        where: { slug: String(slug) },
        include: {
          user: true,
        },
      });
  
      if (!shop) {
        return res.status(404).json({ message: 'Shop not found' });
      }
  
      if (shop.user.banned) {
        return res.status(404).json({ message: 'Shop not found or user is banned' });
      }
  
      if (shop.verification_status !== 0) {
        return res.status(200).json({ shop, verified: true });
      } else {
        return res.status(200).json({ shop, verified: false });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const filterShop = async (data: createOrUpdateData) => {
    try {
      const { slug, type } = req.query;
      const {
        sort_by,
        min_price,
        max_price,
        selected_categories,
        brand,
        rating,
      } = req.query;
  
      if (process.env.VENDOR_SYSTEM_ACTIVATION !== '1') {
        return res.status(403).json({ message: 'Vendor system is not activated' });
      }
  
      const shop = await prisma.shops.findFirst({
        where: { slug: String(slug) },
        include: {
          user: true,
        },
      });
  
      if (!shop || !type) {
        return res.status(404).json({ message: 'Shop not found' });
      }
  
      if (shop.user.banned) {
        return res.status(404).json({ message: 'Shop not found or user is banned' });
      }
  
      if (type === 'all-products') {
        const conditions: any = {
          userId: shop.user.id,
          published: true,
          approved: true,
        };
  
        if (brand) {
          const brandData = await prisma.brands.findFirst({
            where: { slug: String(brand) },
          });
          conditions.brandId = brandData ? brandData.id : null;
        }
  
        if (selected_categories) {
          conditions.categoryId = {
            in: Array.isArray(selected_categories)
              ? selected_categories
              : [selected_categories],
          };
        }
  
        if (min_price && max_price) {
          conditions.unitPrice = {
            gte: Number(min_price),
            lte: Number(max_price),
          };
        }
  
        if (rating) {
          conditions.rating = {
            gte: Number(rating),
          };
        }
  
        let orderBy: any = { id: 'desc' };
        switch (sort_by) {
          case 'newest':
            orderBy = { createdAt: 'desc' };
            break;
          case 'oldest':
            orderBy = { createdAt: 'asc' };
            break;
          case 'price-asc':
            orderBy = { unitPrice: 'asc' };
            break;
          case 'price-desc':
            orderBy = { unitPrice: 'desc' };
            break;
        }
  
        const products = await prisma.products.findMany({
          where: conditions,
          orderBy,
          take: 24,
        });
  
        return res.status(200).json({ shop, type, products });
      }
  
      return res.status(200).json({ shop, type });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const getAllCategories = async (data: createOrUpdateData) => {
    try {
      const categories = await prisma.categories.findMany({
        where: {
          parent_id: 0,
        },
        include: {
          children_categories: true, // Assuming the relation is set up in Prisma schema
        },
        orderBy: {
          order_level: 'desc',
        },
      });
  
      res.status(200).json({ categories });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const getAllBrands = async (data: createOrUpdateData) => {
    try {
      const brands = await prisma.brands.findMany();
      res.status(200).json({ brands });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const updateTop10Settings = async (data: createOrUpdateData) => {
    const { topCategories, topBrands } = req.body;
  
    if (process.env.DEMO_MODE === 'On') {
      return res.status(403).json({ message: 'Action not permitted in demo mode.' });
    }
  
    try {
      // Update categories
      const allCategories = await prisma.categories.findMany();
      for (const category of allCategories) {
        const isTop = Array.isArray(topCategories) && topCategories.includes(category.id);
        await prisma.categories.update({
          where: { id: category.id },
          data: { top: isTop },
        });
      }
  
      // Update brands
      const allBrands = await prisma.brands.findMany();
      for (const brand of allBrands) {
        const isTop = Array.isArray(topBrands) && topBrands.includes(brand.id);
        await prisma.brands.update({
          where: { id: brand.id },
          data: { top: isTop },
        });
      }
  
      res.status(200).json({ message: 'Top 10 categories and brands have been updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const variantPrice = async (data: createOrUpdateData) => {
    try {
      const { id, quantity, color, ...attributes } = req.body;
  
      const product = await prisma.products.findUnique({
        where: { id: parseInt(id) },
        include: {
          stocks: true,
          taxes: true,
          choice_options: true,
        },
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      let str = color || '';
      if (product.choice_options) {
        product.choice_options.forEach((choice) => {
          if (str) {
            str += '-' + attributes[`attribute_id_${choice.attribute_id}`].replace(/\s+/g, '');
          } else {
            str = attributes[`attribute_id_${choice.attribute_id}`].replace(/\s+/g, '');
          }
        });
      }
  
      const productStock = product.stocks.find(stock => stock.variant === str);
  
      if (!productStock) {
        return res.status(404).json({ message: 'Product variant not found' });
      }
  
      let price = productStock.price;
      const qty = productStock.qty;
      const max_limit = qty;
      let tax = 0;
  
      if (product.wholesale_product) {
        const wholesalePrice = await prisma.wholesale_price.findFirst({
          where: {
            stockId: productStock.id,
            min_qty: { lte: quantity },
            max_qty: { gte: quantity },
          },
        });
        if (wholesalePrice) {
          price = wholesalePrice.price;
        }
      }
  
      let in_stock = qty >= product.min_qty;
  
      if (product.stock_visibility_state === 'text') {
        if (qty >= product.min_qty) {
          quantity = 'In Stock';
        } else {
          quantity = 'Out Of Stock';
        }
      }
  
      const discountApplicable = !product.discount_start_date || 
        (new Date() >= new Date(product.discount_start_date) && new Date() <= new Date(product.discount_end_date));
  
      if (discountApplicable) {
        if (product.discount_type === 'percent') {
          price -= (price * product.discount) / 100;
        } else if (product.discount_type === 'amount') {
          price -= product.discount;
        }
      }
  
      product.taxes.forEach((product_tax) => {
        if (product_tax.tax_type === 'percent') {
          tax += (price * product_tax.tax) / 100;
        } else if (product_tax.tax_type === 'amount') {
          tax += product_tax.tax;
        }
      });
  
      price += tax;
  
      res.status(200).json({
        price: (price * quantity).toFixed(2),
        quantity: qty,
        digital: product.digital,
        variation: str,
        max_limit,
        in_stock,
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const sellerPolicy = async (data: createOrUpdateData) => {
    try {
      const page = await prisma.page.findFirst({
        where: { type: 'seller_policy_page' },
      });
  
      if (!page) {
        return res.status(404).json({ message: 'Seller policy page not found' });
      }
  
      res.status(200).json({ page });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const returnPolicy = async (data: createOrUpdateData) => {
    try {
      const page = await prisma.pages.findFirst({
        where: { type: 'return_policy_page' },
      });
  
      if (!page) {
        return res.status(404).json({ message: 'Return policy page not found' });
      }
  
      res.status(200).json({ page });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const supportPolicy = async (data: createOrUpdateData) => {
    try {
      const page = await prisma.pages.findFirst({
        where: { type: 'support_policy_page' },
      });
  
      if (!page) {
        return res.status(404).json({ message: 'Support policy page not found' });
      }
  
      res.status(200).json({ page });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const termsConditions = async (data: createOrUpdateData) => {
    try {
      const page = await prisma.pages.findFirst({
        where: { type: 'terms_conditions_page' },
      });
  
      if (!page) {
        return res.status(404).json({ message: 'Terms and conditions page not found' });
      }
  
      res.status(200).json({ page });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const privacyPolicy = async (data: createOrUpdateData) => {
    try {
      const page = await prisma.pages.findFirst({
        where: { type: 'privacy_policy_page' },
      });
  
      if (!page) {
        return res.status(404).json({ message: 'Privacy policy page not found' });
      }
  
      res.status(200).json({ page });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const getPickUpPoints = async (data: createOrUpdateData) => {
    try {
      const pickUpPoints = await prisma.pickup_points.findMany();
  
      res.status(200).json({ pickUpPoints });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const getCategoryItems = async (data: createOrUpdateData) => {
    try {
      const categoryId = parseInt(req.query.id as string);
      const category = await prisma.categories.findUnique({
        where: { id: categoryId },
        include: { childrenCategories: true },
      });
  
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
  
      res.status(200).json({ category });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const getPremiumPackages = async (data: createOrUpdateData) => {
    try {
      const customerPackages = await prisma.customer_packages.findMany();
      res.status(200).json({ customerPackages });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const updateEmail = async (data: createOrUpdateData) => {
    try {
      const { email } = req.body;
  
      // Check if the new email is unique (You'll need to implement this logic)
      const isUnique = await checkEmailUniqueness(email); // You need to implement this function
  
      if (isUnique) {
        await sendEmailChangeVerificationMail(req, email);
        return res.status(200).json({ message: 'Verification email sent successfully' });
      }
  
      return res.status(400).json({ message: 'Email already exists' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const sendEmailVerificationMail = async (data: createOrUpdateData) => {
    try {
      const { email } = req.body;
  
      // Generate verification code
      const verificationCode = generateVerificationCode();
  
      // Save verification code to the user record in the database
      await prisma.users.update({
        where: { email },
        data: { newEmailVerificationCode: verificationCode },
      });
  
      // Send verification email
      await sendVerificationEmail(email, verificationCode);
  
      res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const emailChangeCallback = async (data: createOrUpdateData) => {
    try {
      const { newEmailVerificationCode, email } = req.query;
  
      // Find the user with the provided verification code
      const user = await prisma.users.findFirst({
        where: {
          newEmailVerificationCode: newEmailVerificationCode as string,
        },
      });
  
      if (user) {
        // Update the user's email and clear verification code
        await prisma.users.update({
          where: { id: user.id },
          data: {
            email: email as string,
            newEmailVerificationCode: null,
          },
        });
  
        // Handle user login (if required)
        // Note: Next.js API routes are stateless, so you may need to handle authentication differently
        // For example, you might generate a JWT token and send it back to the client for subsequent requests
  
        return res.status(200).json({ message: 'Email changed successfully' });
      }
  
      return res.status(404).json({ message: 'Email was not verified. Please resend your mail!' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const getAllFlashDeals = async (data: createOrUpdateData) => {
    try {
      const today = new Date();
      const allFlashDeals = await prisma.flash_deals.findMany({
        where: {
          status: 1,
          start_date: { lte: today },
          end_date: { gt: today },
        },
        orderBy: { created_at: 'desc' },
      });
  
      res.status(200).json(allFlashDeals);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  export const getTodaysDealProducts = async (data: createOrUpdateData) => {
    try {
      const todaysDealProducts = await prisma.products.findMany({
        where: {
          todays_deal: true,
        },
        include: {
          thumbnail: true,
        },
      });
  
      res.status(200).json(todaysDealProducts);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const getAllVerifiedSellers = async (data: createOrUpdateData) => {
    try {
      const verifiedSellers = await prisma.shops.findMany({
        where: {
          users: {
            id: {
              in: verifiedSellersIdArray(), // Implement this function to get an array of verified seller IDs
            },
          },
        },
        include: {
          users: true, // Include user details if needed
        },
        take: 15,
        skip: req.query.page ? (parseInt(req.query.page.toString()) - 1) * 15 : 0,
      });
  
      res.status(200).json(verifiedSellers);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  // Helper function to get an array of verified seller IDs
  const verifiedSellersIdArray = () => {
    // Implement your logic to fetch and return an array of verified seller IDs
  };


  export const getAllCoupons = async (data: createOrUpdateData) => {
    try {
      const coupons = await prisma.coupons.findMany({
        where: {
          start_date: {
            lte: new Date(),
          },
          end_date: {
            gte: new Date(),
          },
        },
        skip: req.query.page ? (parseInt(req.query.page.toString()) - 1) * 15 : 0,
      });
  
      res.status(200).json(coupons);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  export const getAllInHouseProducts = async (data: createOrUpdateData) => {
    try {
      const products = await prisma.products.findMany({
        where: {
          added_by: 'admin',
        },
        include: {
          taxes: true, // Include taxes if needed
        },
        take: 12,
        skip: req.query.page ? (parseInt(req.query.page.toString()) - 1) * 12 : 0,
      });
  
      res.status(200).json(products);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };