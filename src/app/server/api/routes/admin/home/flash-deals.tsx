import { NextResponse } from "next/server";
import { getAllFlashDeals } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getAllFlashDeals();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}