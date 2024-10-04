import { NextResponse } from "next/server";
import { getAuctionProductDetails } from '@/app/server/controllers/AuctionProductController';

export async function GET() {
    const result = await getAuctionProductDetails();
    try{
        const getAuctionProductDetails = result.data;
        return NextResponse.json(getAuctionProductDetails);
    }catch(error){
        console.error("Error fetching getAuctionProductDetails:", error);
        return NextResponse.json({ error: "Failed to fetch Auction Product Details" }, { status: 500 });
    }
  }
