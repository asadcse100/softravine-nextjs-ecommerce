import { NextResponse } from "next/server";
import { getAuctionProductDetails } from '@/app/server/controllers/AuctionProductController';

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
