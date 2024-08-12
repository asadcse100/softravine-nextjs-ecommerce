import { NextResponse } from "next/server";
import { store } from '@/app/server/controllers/ConversationController';

export async function GET() {
  const result = await store();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}