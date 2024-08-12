import { NextResponse } from "next/server";
import { getMyBiddedProducts } from '@/app/server/controllers/AuctionProductBidController';

export async function GET() {
  const result = await getMyBiddedProducts();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}