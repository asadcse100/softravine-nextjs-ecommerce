// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDeliveryBoys = async () => {
  try {
    const delivery_boys = await prisma.delivery_boys.findMany();
    // Convert BigInt fields to strings
    const serializedWholesaleProducts = delivery_boys.map(delivery_boy => ({
      ...delivery_boy,
      user_id: delivery_boy.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: delivery_boys };
  } catch (error) {
    console.error("Error fetching delivery boys:", error);
    return { success: false, error };
  }
}

export const getDeliveryBoysPaymentHistories = async () => {
  try {
    const delivery_boy_payments = await prisma.delivery_boy_payments.findMany();
    // Convert BigInt fields to strings
    const serializedBoysPaymentHistories = delivery_boy_payments.map(delivery_boy_payment => ({
      ...delivery_boy_payment,
      user_id: delivery_boy_payment.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedBoysPaymentHistories };
  } catch (error) {
    return { success: false, error };
  }
}

export const getDeliveryBoysCollectedHistory = async () => {
  try {
    const delivery_boy_collections = await prisma.delivery_boy_collections.findMany();
    // Convert BigInt fields to strings
    const serializedDeliveryBoyCollections = delivery_boy_collections.map(delivery_boy_collection => ({
      ...delivery_boy_collection,
      user_id: delivery_boy_collection.user_id.toString(), // Assuming id is the BigInt field
    }));
    return { success: true, data: serializedDeliveryBoyCollections };
  } catch (error) {
    console.error("Error fetching delivery boys:", error);
    return { success: false, error };
  }
}

