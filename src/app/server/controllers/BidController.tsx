import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBlogs = async () => {
        try{
            const blogs = await prisma.product_taxes.findMany();
            return { success: true, data: blogs };
        }catch(error){
            console.error("Error fetching blogs:", error);
            return { success: false, error };
        }
    }