// pages/api/attribute-values/[id].ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  attribute_id: number;
  value: string;
  color_code: string;
  created_at: string;
};

export async function createOrUpdateAttributeValue(data: createOrUpdateData) {
  try {
    const newPost = await prisma.attribute_values.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        attribute_id: data.attribute_id,
        value: data.value,
        color_code: data.color_code,
        updated_at: data.created_at,
      },
      create: {
        id: data.id ?? undefined, // Ensure `id` is included only if provided
        attribute_id: data.attribute_id,
        value: data.value,
        color_code: data.color_code,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    // console.error("Error creating blog post:", error);
    return { success: false, error };
  }
}

export const deleteAttributeValue = async (id: number) => {
  try {
    // Check if the record exists
    const existingAttributeValues = await prisma.attribute_values.findUnique({
      where: { id },
    });

    if (!existingAttributeValues) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedAttributeValues = await prisma.attribute_values.delete({
      where: { id },
    });
    return { success: true, data: deletedAttributeValues };
  } catch (error) {
    // console.error("Error deleting AttributeValues:", error);
    return { success: false, error };
  }
};