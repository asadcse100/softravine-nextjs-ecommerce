import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    product_id: number;
    user_id: number;
    amount: number;
    created_at: string;
};

export const getAllBlogs = async () => {
    try {
        const blogs = await prisma.auction_product_bids.findMany();
        return { success: true, data: blogs };
    } catch (error) {
        // console.error("Error fetching blogs:", error);
        return { success: false, error };
    }
}

export async function createOrUpdateBid(data: createOrUpdateData) {
    try {
        const created_at = data.created_at ? new Date(data.created_at) : new Date();
        const newPost = await prisma.auction_product_bids.upsert({
            where: { id: data.id || 0, product_id: data.product_id || 0 }, // Fallback to 0 if `data.id` is null
            update: {
                product_id: data.product_id,
                user_id: data.user_id,
                amount: data.user_id,
                updated_at: data.created_at,
            },
            create: {
                product_id: data.product_id,
                user_id: data.user_id,
                amount: data.user_id,
                created_at: data.created_at,
            }
        });

        return { success: true, data: newPost };
    } catch (error) {
        // console.error("Error creating blog post:", error);
        return { success: false, error };
    }
}