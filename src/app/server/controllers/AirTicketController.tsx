// controllers/attributeController.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type createOrUpdateData = {
  id: number | null;
  user_id: number;
  ticket_category_id: number;
  where_to?: string;
  travel_date?: string | Date;
  return_date?: string | Date;
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

    const newPost = await prisma.air_tickets.upsert({
      where: { id: data.id ?? 0 }, // Fallback to 0 if `data.id` is null
      update: {
        user_id: data.user_id,
        ticket_category_id: data.ticket_category_id,
        where_to: data.where_to,
        travel_date: data.travel_date,
        return_date: data.return_date,
        passenger_number: data.passenger_number,
        updated_at: data.created_at,
      },
      create: {
        user_id: data.user_id,
        ticket_category_id: data.ticket_category_id,
        where_to: data.where_to,
        travel_date: data.travel_date,
        return_date: data.return_date,
        passenger_number: data.passenger_number,
        created_at: data.created_at,
      }
    });

    return { success: true, data: newPost };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error };
  }
}

export const deleteAirTicket = async (id: number) => {
  try {
    // Check if the record exists
    const existingAirTickets = await prisma.air_tickets.findUnique({
      where: { id },
    });

    if (!existingAirTickets) {
      return { success: false, error: "Record does not exist." };
    }

    const deletedAirTickets = await prisma.air_tickets.delete({
      where: { id },
    });
    return { success: true, data: deletedAirTickets };
  } catch (error) {
    console.error("Error deleting AirTickets:", error);
    return { success: false, error };
  }
};
