import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { sendEmailVerification } from '../utils/sendEmailVerification';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  seller_package_id: number;
  name: string;
  logo: string;
  sliders: string;
  top_banner: string;
  banner_full_width_1: string;
  banners_half_width: string;
  banner_full_width_2: string;
  phone: string;
  address: string;
  rating: number;
  num_of_reviews: number;
  num_of_sale: number;
  product_upload_limit: number;
  package_invalid_at: string;
  verification_status: number;
  verification_info: string;
  cash_on_delivery_status: number;
  admin_to_pay: number;
  facebook: string;
  instagram: string;
  google: string;
  twitter: string;
  youtube: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  pick_up_point_id: string;
  shipping_cost: number;
  delivery_pickup_latitude: number;
  delivery_pickup_longitude: number;
  bank_name: string;
  bank_acc_name: string;
  bank_acc_no: string;
  bank_routing_no: number;
  bank_payment_status: number;
  created_at?: string;
};

// export const createSeller = (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.isAuthenticated()) {
//     const user = req.user;

//     if (user.userType === 'admin' || user.userType === 'customer') {
//       return res.status(400).json({ error: 'Admin or Customer cannot be a seller' });
//     }

//     if (user.userType === 'seller') {
//       return res.status(400).json({ error: 'This user is already a seller' });
//     }
//   } else {
//     return res.status(200).json({ view: 'frontend.seller_form' });
//   }
// };

// export const createSeller = async () => {
//   try {
//     const user = await prisma.users.findMany();
//     return { success: true, data: user };
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return { success: false, error };
//   }
// }

// export const storeSeller = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { name, email, password, shopName, address } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.users.create({
//       data: {
//         name,
//         email,
//         user_type: 'seller',
//         password: hashedPassword,
//       },
//     });

//     const shopSlug = shopName.replace(/\s+/g, '-').replace(/\//g, ' ');

//     const shop = await prisma.shops.create({
//       data: {
//         user_id: user.id,
//         name: shopName,
//         address,
//         slug: shopSlug,
//       },
//     });

//     // Assuming a function to authenticate and login the user
//     await loginUser(req, res, user);

//     const emailVerificationSetting = await prisma.businessSetting.findUnique({
//       where: { type: 'email_verification' },
//     });

//     if (emailVerificationSetting?.value == 0) {
//       await prisma.user.update({
//         where: { id: user.id },
//         data: { emailVerifiedAt: new Date() },
//       });
//     } else {
//       sendEmailVerification(user);
//     }

//     res.status(200).json({ message: 'Your Shop has been created successfully!', shop });
//   } catch (error) {
//     res.status(500).json({ error: 'Sorry! Something went wrong.' });
//   }
// };

// Utility function to generate slugs
function generateSlug(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createOrUpdateSeller(data: createOrUpdateData) {
  try {
    // Generate a slug
    const slug = generateSlug(data.name);
    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.shops.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        user_id: data.user_id,
        name: data.name,
        address: data.address,
        slug: data.slug,
        updated_at: data.created_at,
      },
      create: {
        user_id: data.user_id,
        name: data.name,
        address: data.address,
        slug: data.slug,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
};

// Dummy login function, replace with actual authentication logic
async function loginUser(data: createOrUpdateData) {
  // Login logic here, for example using NextAuth or a custom session
}