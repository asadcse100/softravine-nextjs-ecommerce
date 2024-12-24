import { getSession } from 'next-auth/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    user_id: number;
    product_id: number;
    created_at?: string;
};

// export default async (req: NextApiRequest, res: NextApiResponse) => {
// export async function wishlists(req: NextApiRequest, res: NextApiResponse) {
//     const session = await getSession({ req });

//     if (!session) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const wishlists = await prisma.wishlist.findMany({
//         where: { userId: session.user.id },
//     });

//     res.status(200).json(wishlists);
// };

export const wishlists = async () => {
    try {
        const wishlist = await prisma.wishlists.findMany();
        return { success: true, data: wishlist };
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        return { success: false, error };
    }
}

// export async function store(req: NextApiRequest, res: NextApiResponse) {
//     const { id } = req.body;
//     const userId = req.cookies.userId; // Assuming userId is stored in cookies

//     try {
//         if (userId) {
//             const wishlist = await prisma.wishlist.findFirst({
//                 where: {
//                     user_id: Number(userId),
//                     product_id: Number(id)
//                 }
//             });

//             if (!wishlist) {
//                 await prisma.wishlist.create({
//                     data: {
//                         user_id: Number(userId),
//                         product_id: Number(id)
//                     }
//                 });
//             }
//             res.status(200).json({ message: 'Wishlist updated successfully' });
//         } else {
//             res.status(403).json({ error: 'User not authenticated' });
//         }
//     } catch (error) {
//         console.error('Error updating wishlist:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

export async function createOrUpdateTax(data: createOrUpdateData) {
    try {

        const created_at = data.created_at ? new Date(data.created_at) : new Date();

        const newPost = await prisma.wishlists.upsert({
            where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
            update: {
                user_id: data.user_id,
                product_id: data.product_id,
                updated_at: data.created_at,
            },
            create: {
                user_id: data.user_id,
                product_id: data.product_id,
                created_at: data.created_at,
            }
        });

        return { success: true, data: newPost };
    } catch (error) {
        console.error("Error creating blog post:", error);
        return { success: false, error };
    }
};

// export async function remove() {
//     const { id } = req.body;

//     try {
//         const wishlist = await prisma.wishlists.findUnique({
//             where: {
//                 id: Number(id)
//             }
//         });

//         if (wishlist) {
//             await prisma.wishlists.delete({
//                 where: {
//                     id: Number(id)
//                 }
//             });
//             res.status(200).json({ message: 'Wishlist item removed successfully' });
//         } else {
//             res.status(404).json({ error: 'Wishlist item not found' });
//         }
//     } catch (error) {
//         console.error('Error removing wishlist item:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

export const deleteWishlist = async (id: number) => {
  try {
    // Check if the record exists
    const existingWishlist = await prisma.wishlists.findUnique({
      where: { id },
    });

    if (!existingWishlist) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedWishlist = await prisma.wishlists.delete({
      where: { id },
    });
    return { success: true, data: deletedWishlist };
  } catch (error) {
    console.error("Error deleting Wishlist:", error);
    return { success: false, error };
  }
};