// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  ticket_category_id: number;
  where_to?: string;
  travel_date?: string;
  return_date?: string;
  passenger_number: string;
  created_at?: string;
};

export const getAirTickets = async () => {

  try {
    const air_tickets = await prisma.air_tickets.findMany();
    return { success: true, data: air_tickets };
  } catch (error) {
    console.error("Error fetching air tickets:", error);
    return { success: false, error };
  }
}

export async function createOrUpdateAirTicket(data: createOrUpdateData) {
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
