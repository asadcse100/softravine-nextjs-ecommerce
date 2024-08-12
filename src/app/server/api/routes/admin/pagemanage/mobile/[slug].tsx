import { NextResponse } from "next/server";
import { showMobileCustomPage } from '@/app/server/controllers/PageController';

export async function GET() {
  const result = await getAuctionProductDetails();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}