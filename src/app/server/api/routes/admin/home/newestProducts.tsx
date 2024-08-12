import { NextResponse } from "next/server";
import { loadNewestProductSection } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await loadNewestProductSection();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
