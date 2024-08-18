import { NextResponse } from "next/server";
import { getMyBiddedProducts } from '@/app/server/controllers/AuctionProductBidController';

export async function GET() {
  const result = await getMyBiddedProducts();
  try{
      const myBids = result.data;
      return NextResponse.json(myBids);
  }catch(error){
      console.error("Error fetching myBids:", error);
      return NextResponse.json({ error: "Failed to fetch My Bids" }, { status: 500 });
  }
}