import { NextResponse } from "next/server";
import { getAdminTickets, createTicketReply } from '@/app/server/controllers/SupportTicketController'; // Import the controller function

export async function GET() {
  const result = await getAdminTickets();
  try{
      const supportTickets = result.data;
      return NextResponse.json(supportTickets);
  }catch(error){
      console.error("Error fetching supportTickets:", error);
      return NextResponse.json({ error: "Failed to fetch Support Tickets" }, { status: 500 });
  }
}