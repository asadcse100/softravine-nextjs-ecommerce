import { NextResponse } from "next/server";
import { store } from '@/app/server/controllers/ConversationController';

export async function GET() {
  const result = await store();
  try{
      const conversation = result.data;
      return NextResponse.json(conversation);
  }catch(error){
      console.error("Error fetching conversation:", error);
      return NextResponse.json({ error: "Failed to fetch conversation" }, { status: 500 });
  }
}