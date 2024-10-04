import { NextResponse } from "next/server";
import { getAuctionOrderDetails } from '@/app/server/controllers/AuctionProductController';

export async function GET() {
  const result = await getAuctionOrderDetails();
  try{
      const getAuctionOrderDetails = result.data;
      return NextResponse.json(getAuctionOrderDetails);
  }catch(error){
      console.error("Error fetching getAuctionOrderDetails:", error);
      return NextResponse.json({ error: "Failed to fetch Auction Order Details" }, { status: 500 });
  }
}