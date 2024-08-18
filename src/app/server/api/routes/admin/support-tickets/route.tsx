import { NextResponse } from "next/server";
import { getUserTickets, createTicket } from '@/app/server/controllers/SupportTicketController'; // Import the controller function

export async function GET() {
  const result = await getUserTickets();
  try{
      const supportTickets = result.data;
      return NextResponse.json(supportTickets);
  }catch(error){
      console.error("Error fetching supportTickets:", error);
      return NextResponse.json({ error: "Failed to fetch SupportTickets" }, { status: 500 });
  }
}