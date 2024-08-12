import { NextResponse } from "next/server";
import { createSeller, storeSeller } from '@/app/server/controllers/ShopController'; // Import the controller function

export async function GET() {
  const result = await createSeller();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}