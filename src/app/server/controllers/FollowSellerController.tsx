
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  shop_id: number;
};

// export const getFollowedSellers = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const userId = req.user.id; // Assuming you have middleware to attach user to request
//     if (!userId) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     const followedSellers = await prisma.followSeller.findMany({
//       where: {
//         userId: userId,
//       },
//       orderBy: {
//         shopId: 'asc',
//       },
//       include: {
//         shop: true, // Assuming there's a relation to the shop model
//       },
//     });

//     res.status(200).json(followedSellers);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

export const getFollowedSellers = async () => {
  try{
      const followedSellers = await prisma.follow_sellers.findMany();
      return { success: true, data: followedSellers };
  }catch(error){
      // console.error("Error fetching followedSellers:", error);
      return { success: false, error };
  }
}

export const getFollowSellerById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.follow_sellers.findUnique({
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

export const followSellerController = {
  async store() {
    try {
      // Assuming user is attached to the request
      const userId = req.users.id;
      const { id: shopId } = req.body;

      if (!userId) {
        return res.status(401).json({ message: 'You need to login as a customer to follow this seller' });
      }

      const followedSeller = await prisma.follow_sellers.findFirst({
        where: {
          user_id,
          shop_id,
        },
      });

      if (!followedSeller) {
        await prisma.follow_sellers.create({
          data: {
            user_id,
            shop_id,
          },
        });
      }
      return { success: true, data: followedSeller };
      // res.status(200).json({ message: 'Seller is followed Successfully' });
    } catch (error) {
      return { success: false, error };
      // console.error('Error:', error);
      // res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async remove() {
    try {
      const userId = req.users.id; // Assuming you have middleware to attach user to request
      const { id: shopId } = req.body;

      if (!userId) {
        return { success: false, error };
        // return res.status(401).json({ message: 'Unauthorized' });
      }

      const followedSeller = await prisma.follow_sellers.findFirst({
        where: {
          userId,
          shopId,
        },
      });

      if (followedSeller) {
        await prisma.follow_sellers.deleteMany({
          where: {
            userId,
            shopId,
          },
        });

        return { success: true, data: followedSeller };
        // res.status(200).json({ message: 'Seller is unfollowed Successfully' });
      } else {
        // res.status(404).json({ message: 'Followed seller not found' });
        return { success: false, error };
      }
    } catch (error) {
      // console.error('Error:', error);
      // res.status(500).json({ message: 'Internal Server Error' });
      return { success: false, error };
    }
  },
};

