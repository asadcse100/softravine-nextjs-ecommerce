// controllers/ReviewController.ts

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  product_id: number;
  user_id: number;
  rating: number;
  comment: string;
  photos: string;
  status: number;
  viewed: number;
  created_at: string;
};

// export async function getReviews(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     let reviews = await prisma.review.findMany({
//       orderBy: { created_at: 'desc' },
//     });

//     if (req.query.rating) {
//       const [order, direction] = (req.query.rating as string).split(',');
//       reviews = reviews.sort((a, b) => {
//         if (direction === 'asc') {
//           return a.rating - b.rating;
//         } else {
//           return b.rating - a.rating;
//         }
//       });
//     }

//     res.status(200).json({ reviews });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export const getReviewById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.reviews.findUnique({
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

export const getReviews = async () => {
  try {
    const reviews = await prisma.reviews.findMany();
    // Convert BigInt fields to strings
    const serializedReviews = reviews.map(review => ({
      ...review,
      product_id: review.product_id.toString(), // Assuming id is the BigInt field
      user_id: review.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedReviews };
  } catch (error) {
    // console.error("Error fetching reviews:", error);
    return { success: false, error };
  }
}


// export async function createReview(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { product_id, rating, comment, photos } = req.body;
//     const userId = req.session.userId; // Assuming you're using session-based authentication

//     const review = await prisma.review.create({
//       data: {
//         product_id,
//         user_id: userId,
//         rating,
//         comment,
//         photos: photos.join(','),
//         viewed: false,
//       },
//     });

//     // Update product rating
//     const product = await prisma.product.update({
//       where: { id: product_id },
//       data: {
//         rating: await prisma.review.aggregate({
//           _avg: { rating: true },
//           where: { product_id, status: 1 },
//         })._avg.rating || 0,
//       },
//     });

//     // Update seller rating if applicable
//     if (product.added_by === 'seller') {
//       const seller = await prisma.shop.update({
//         where: { user_id: product.user_id },
//         data: {
//           rating: await prisma.review.aggregate({
//             _avg: { rating: true },
//             where: { product: { user_id: product.user_id }, status: 1 },
//           })._avg.rating || 0,
//           num_of_reviews: {
//             increment: 1,
//           },
//         },
//       });
//     }

//     res.status(201).json({ review, message: 'Review submitted successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export async function createOrUpdateBrand(data: createOrUpdateData) {
  try {
    // Use the provided `created_at` or fallback to the current date
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    // Perform the upsert operation
    const newCategory = await prisma.reviews.upsert({
      where: { id: data.id || 0 }, // Replace `0` with a non-zero ID if necessary
      update: {
        product_id: data.product_id,
        user_id: data.user_id,
        rating: data.rating,
        comment: data.comment,
        photos: data.photos,
        status: data.status,
        viewed: data.viewed,
        updated_at: created_at,
      },
      create: {
        product_id: data.product_id,
        user_id: data.user_id,
        rating: data.rating,
        comment: data.comment,
        photos: data.photos,
        status: data.status,
        viewed: data.viewed,
        created_at: created_at,
      },
    });

        // Update product rating
    const product = await prisma.products.update({
      where: { id: product_id },
      data: {
        rating: await prisma.reviews.aggregate({
          _avg: { rating: true },
          where: { product_id, status: 1 },
        })._avg.rating || 0,
      },
    });

        // Update seller rating if applicable
    if (product.added_by === 'seller') {
      const seller = await prisma.shops.update({
        where: { user_id: product.user_id },
        data: {
          rating: await prisma.reviews.aggregate({
            _avg: { rating: true },
            where: { products: { user_id: product.user_id }, status: 1 },
          })._avg.rating || 0,
          num_of_reviews: {
            increment: 1,
          },
        },
      });
    }

    return { success: true, data: newCategory };
  } catch (error) {
    return { success: false, error };
    // console.error("Error creating or updating blog category:", error);
    // return { success: false, message: "An unexpected error occurred" };
  }
}

// export async function updatePublished(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const { id, status } = req.body;

//     const review = await prisma.review.update({
//       where: { id: Number(id) },
//       data: { status: Boolean(status) },
//     });

//     const product = await prisma.product.update({
//       where: { id: review.product_id },
//       data: {
//         rating: await prisma.review.aggregate({
//           _avg: { rating: true },
//           where: { product_id: review.product_id, status: true },
//         })._avg.rating || 0,
//       },
//     });

//     if (product.added_by === 'seller') {
//       const seller = await prisma.shop.update({
//         where: { user_id: product.user_id },
//         data: {
//           rating: await prisma.review.aggregate({
//             _avg: { rating: true },
//             where: { product: { user_id: product.user_id }, status: true },
//           })._avg.rating || 0,
//           num_of_reviews: {
//             [status ? 'increment' : 'decrement']: 1,
//           },
//         },
//       });
//     }

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }