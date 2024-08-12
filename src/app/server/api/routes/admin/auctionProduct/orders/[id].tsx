import { NextResponse } from "next/server";
import { getAuctionOrderDetails } from '@/app/server/controllers/AuctionProductController';

export async function GET() {
  const result = await getAuctionOrderDetails();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}