import { NextResponse } from "next/server";
import { trackOrder } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await trackOrder();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}