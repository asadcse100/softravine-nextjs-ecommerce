import { NextResponse } from "next/server";
import { getSellers, createSeller } from '@/app/server/controllers/SellerController'; // Import the controller function

export async function GET() {
  const result = await getSellers();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
