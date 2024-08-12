import { NextResponse } from "next/server";
import { showCustomPage } from '@/app/server/controllers/PageController';

export async function GET() {
  const result = await showCustomPage();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
