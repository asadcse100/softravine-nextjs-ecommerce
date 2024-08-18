import { NextResponse } from "next/server";
import { placeBid } from '@/app/server/controllers/AuctionProductBidController';

export async function GET() {
  const result = await placeBid();
  try{
      const placeBid = result.data;
      return NextResponse.json(placeBid);
  }catch(error){
      console.error("Error fetching placeBid:", error);
      return NextResponse.json({ error: "Failed to fetch Place Bid" }, { status: 500 });
  }
}