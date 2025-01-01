import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
    id: number | null;
    type: string;
    value: string;
};

export const getPolicyByName = async (data: createOrUpdateData) => {
    // const { type } = req.query;
    const type = data.type;

    try {
        const policy = await prisma.pages.findFirst({
            where: { name: String(type) },
        });

        if (policy) {
            // res.status(200).json(policy);
            return { success: true, data: policy };
        } else {
            return { success: false };
            // res.status(404).json({ message: 'Policy not found' });
        }
    } catch (error) {
        return { success: false, error };
        // res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
};

export const getPolicyById = async (id: number) => {
    try {
        // Check if the record exists
        const existingCategory = await prisma.pages.findUnique({
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

export const upsertPolicy = async (data: createOrUpdateData) => {
    // const { name, content } = req.body;

    try {
        const policy = await prisma.pages.upsert({
            where: { data.name },
            update: { data.content },
            create: { data.name, data.content },
        });

        return { success: true, data: policy };
        // res.status(200).json({ message: `${name} updated successfully`, policy });
    } catch (error) {
        return { success: false, error };
        // res.status(500).json({ error: 'Something went wrong', details: error.message });
    }
};