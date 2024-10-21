import { NextResponse } from "next/server";
import { customerTickets } from '@/app/server/controllers/SupportTicketController';

export async function GET() {
  const result = await customerTickets();
  try{
      const customerTickets = result.data;
      return NextResponse.json(customerTickets);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Tickets" }, { status: 500 });
  }
}