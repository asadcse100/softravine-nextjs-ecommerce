import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  type: string;
  value: string;
};

export const getClubPoint = async () => {
  try{
      const cities = await prisma.cities.findMany();
      return { success: true, data: cities };
  }catch(error){
      console.error("Error fetching cities:", error);
      return { success: false, error };
  }
}

export const getUserPoint = async () => {
  try{
      const cities = await prisma.cities.findMany();
      return { success: true, data: cities };
  }catch(error){
      console.error("Error fetching cities:", error);
      return { success: false, error };
  }
}

export async function createOrUpdateClubPoint(data: createOrUpdateData) {
  try {

    const newPost = await prisma.affiliate_configs.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        type: data.type,
        value: data.value,
      },
      create: {
        id: data.id ?? undefined, // Ensure `id` is included only if provided
        type: data.type,
        value: data.value,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
}

export async function createOrUpdateUserPoint(data: createAffiliateConfigurationData) {
  try {

    const newPost = await prisma.affiliate_configs.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        type: data.type,
        value: data.value,
      },
      create: {
        id: data.id ?? undefined, // Ensure `id` is included only if provided
        type: data.type,
        value: data.value,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
}
