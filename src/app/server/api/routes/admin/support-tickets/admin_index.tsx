import { NextResponse } from "next/server";
import { getAdminTickets, createTicketReply } from '@/app/server/controllers/SupportTicketController'; // Import the controller function

export async function GET() {
  const result = await getAdminTickets();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}