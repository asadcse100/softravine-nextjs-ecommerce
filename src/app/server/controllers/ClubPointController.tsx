import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  type: string;
  value: string;
  created_at?: string;
};

export const getClubPoint = async () => {
  try {
    const cities = await prisma.cities.findMany();
    return { success: true, data: cities };
  } catch (error) {
    console.error("Error fetching cities:", error);
    return { success: false, error };
  }
}

export const getUserPoint = async () => {
  try {
    const cities = await prisma.cities.findMany();
    return { success: true, data: cities };
  } catch (error) {
    console.error("Error fetching cities:", error);
    return { success: false, error };
  }
}

export async function createOrUpdateClubPoint(data: createOrUpdateData) {
  try {
    const created_at = data.created_at ? new Date(data.created_at) : new Date();
    const newPost = await prisma.affiliate_configs.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        type: data.type,
        value: data.value,
        updated_at: data.created_at,
      },
      create: {
        type: data.type,
        value: data.value,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
}

export async function createOrUpdateUserPoint(data: createOrUpdateData) {
  try {

    const newPost = await prisma.affiliate_configs.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        type: data.type,
        value: data.value,
        updated_at: data.created_at,
      },
      create: {
        type: data.type,
        value: data.value,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
}

export const deleteUserPoint = async (id: number) => {
  try {
    // Check if the record exists
    const existingUserPoints = await prisma.categories.findUnique({
      where: { id },
    });

    if (!existingUserPoints) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedUserPoints = await prisma.categories.delete({
      where: { id },
    });
    return { success: true, data: deletedUserPoints };
  } catch (error) {
    console.error("Error deleting UserPoints:", error);
    return { success: false, error };
  }
};