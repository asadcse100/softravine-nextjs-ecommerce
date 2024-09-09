// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDeliveryBoys = async () => {
  try {
    const delivery_boys = await prisma.delivery_boys.findMany();
    return { success: true, data: delivery_boys };
  } catch (error) {
    console.error("Error fetching delivery boys:", error);
    return { success: false, error };
  }
}

