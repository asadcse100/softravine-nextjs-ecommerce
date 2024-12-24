// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  name: string;
  created_at: string;
};

export const getAttributes = async () => {

  try {
    const attributes = await prisma.attributes.findMany();
    return { success: true, data: attributes };
  } catch (error) {
    console.error("Error fetching attributes:", error);
    return { success: false, error };
  }
}

export async function createOrUpdateAttribute(data: createOrUpdateData) {
  try {

    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.attributes.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        name: data.name,
        updated_at: data.created_at,
      },
      create: {
        id: data.id ?? undefined, // Ensure `id` is included only if provided
        name: data.name,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
}

export const deleteAttribute = async (id: number) => {
  try {
    // Check if the record exists
    const existingattributes = await prisma.attributes.findUnique({
      where: { id },
    });

    if (!existingattributes) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedattributes = await prisma.attributes.delete({
      where: { id },
    });
    return { success: true, data: deletedattributes };
  } catch (error) {
    console.error("Error deleting attributes:", error);
    return { success: false, error };
  }
};

