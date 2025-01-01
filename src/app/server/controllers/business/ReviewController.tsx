import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    type: string;
    value: string;
};

// export default async function ReviewController(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'GET') {
//         return handleGet(req, res);
//     } else {
//         res.status(405).end(); // Method Not Allowed
//     }
// }

// async function handleGet(req: NextApiRequest, res: NextApiResponse) {
export const Review = async (data: createOrUpdateData) => {
    try {
        const reviews = await prisma.reviews.findMany({
            orderBy: { id: 'desc' },
            distinct: ['id'],
            where: {
                products: { user_id: Number(req.query.id) }
            },
            include: { products: true }
        });

        for (const review of reviews) {
            await prisma.reviews.update({
                where: { id: review.id },
                data: { viewed: true }
            });
        }

        res.status(200).json(reviews);
    } catch (error) {
        return { success: false, error };
        // console.error('Error:', error);
        // res.status(500).json({ message: 'Internal Server Error' });
    }
}
