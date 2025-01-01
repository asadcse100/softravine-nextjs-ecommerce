import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    customer_id: number;
    seller_id: number;
    product_id: number;
    question: string;
    reply: string;
    created_at?: string;
};

export const getProductQueries = async () => {
    try {
        const product_queries = await prisma.product_queries.findMany();
        // Convert BigInt fields to strings
        const serializedProductQuerie = product_queries.map(product_querie => ({
            ...product_querie,
            id: product_querie.id.toString(), // Assuming id is the BigInt field
            customer_id: product_querie.customer_id.toString(), // Assuming id is the BigInt field
            product_id: product_querie.product_id.toString(), // Assuming id is the BigInt field
        }));
        return { success: true, data: serializedProductQuerie };
    } catch (error) {
        return { success: false, error };
    }
};

export const getProductQueryById = async (id: number) => {
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
        console.error("Error category:", error);
        return { success: false, error };
    }
};

// export const createProductQuery = async (data: createOrUpdateData) => {
//     try {
//         const { question, productId } = req.body;
//         const product = await prisma.product.findUnique({
//             where: { id: Number(productId) },
//             select: { user_id: true } // Fetch seller ID
//         });

//         if (!product) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }

//         const query = await prisma.productQuery.create({
//             data: {
//                 customer_id: Number(req.headers.userid), // Assuming you're passing user ID in headers
//                 seller_id: product.user_id,
//                 product_id: Number(productId),
//                 question: question
//             }
//         });

//         return res.status(201).json({ success: true, query });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };

export async function createOrUpdateProductQuery(data: createOrUpdateData) {
    try {
        // Use the provided `created_at` or fallback to the current date
        const created_at = data.created_at ? new Date(data.created_at) : new Date();
        // Perform the upsert operation
        const newCategory = await prisma.products.upsert({
            where: { id: data.id || 0, slug: slug }, // Replace `0` with a non-zero ID if necessary
            update: {
                customer_id: data.customer_id,
                seller_id: data.seller_id,
                product_id: data.product_id,
                question: data.question,
                reply: data.reply,
                updated_at: created_at,
            },
            create: {
                customer_id: data.customer_id,
                seller_id: data.seller_id,
                product_id: data.product_id,
                question: data.question,
                reply: data.reply,
                created_at: created_at,
            },
        });

        return { success: true, data: newCategory };
    } catch (error) {
        return { success: false, error };
        // console.error("Error creating or updating blog category:", error);
        // return { success: false, error: error.message || "An unexpected error occurred" };
    }
}

export const replyToQuery = async (data: createOrUpdateData) => {
    try {
        // const { reply } = req.body;
        const reply = data.reply;
        const queryId = Number(data.id);

        const query = await prisma.product_queries.update({
            where: { id: queryId },
            data: { reply: reply }
        });

        // return res.status(200).json({ success: true, query });
        return { success: true, data: query };
    } catch (error) {
        return { success: false, error };
        // console.error(error);
        // return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};