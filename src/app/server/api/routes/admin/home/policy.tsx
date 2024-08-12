import { NextResponse } from "next/server";
import { sellerPolicy } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await sellerPolicy();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
