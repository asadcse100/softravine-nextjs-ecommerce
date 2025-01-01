
import { NextResponse } from "next/server";
import { ticketReplies } from '@/app/server/controllers/ConversationController'; // Import the controller function

export async function GET() {
  const result = await ticketReplies();
  try{
      const ticketReplies = result.data;
      return NextResponse.json(ticketReplies);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch SupportTickets" }, { status: 500 });
  }
}