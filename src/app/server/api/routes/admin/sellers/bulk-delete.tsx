import { NextResponse } from "next/server";
import { updateSeller, deleteSeller } from '@/app/server/controllers/SellerController';

export async function GET() {
  const result = await updateSeller();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
