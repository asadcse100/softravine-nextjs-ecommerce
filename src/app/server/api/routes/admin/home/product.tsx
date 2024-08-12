import { NextResponse } from "next/server";
import { getProductDetails } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getProductDetails();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
