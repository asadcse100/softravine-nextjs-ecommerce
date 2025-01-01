// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  total_collection: number;
  total_earning: number;
  monthly_salary: number;
  order_commission: number;
  created_at?: string;
};

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
    // console.error("Error fetching delivery boys:", error);
    return { success: false, error };
  }
}

export const getDeliveryBoyById = async (id: number) => {
  try {
    // Check if the record exists
    const existingCategory = await prisma.delivery_boys.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      return { success: false, error: "Record does not exist." };
    }

    return { success: true, data: existingCategory };
  } catch (error) {
    // console.error("Error category:", error);
    return { success: false, error };
  }
};

// export const createOrUpdateDeliveryBoy = async () => {
//   try {
//     const delivery_boys = await prisma.delivery_boys.findMany();
//     // Convert BigInt fields to strings
//     const serializedWholesaleProducts = delivery_boys.map(delivery_boy => ({
//       ...delivery_boy,
//       user_id: delivery_boy.user_id.toString(), // Assuming id is the BigInt field
//     }));
//     return { success: true, data: delivery_boys };
//   } catch (error) {
//     console.error("Error fetching delivery boys:", error);
//     return { success: false, error };
//   }
// }

export async function createOrUpdateDeliveryBoy(data: createOrUpdateData) {
  try {

    const created_at = data.created_at ? new Date(data.created_at) : new Date();

    const newPost = await prisma.delivery_boys.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        user_id: data.user_id,
        total_collection: data.total_collection,
        total_earning: data.total_earning,
        monthly_salary: data.monthly_salary,
        order_commission: data.order_commission,
        updated_at: data.created_at,
      },
      create: {
        user_id: data.user_id,
        total_collection: data.total_collection,
        total_earning: data.total_earning,
        monthly_salary: data.monthly_salary,
        order_commission: data.order_commission,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    // console.error("Error creating Customer Package:", error);
    return { success: false, error };
  }
};


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
    // console.error("Error fetching delivery boys:", error);
    return { success: false, error };
  }
}

