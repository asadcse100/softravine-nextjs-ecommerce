import { NextResponse } from "next/server";
import { withAuth } from '@/app/server/middleware/withAuth';
import { updateAuctionProduct, deleteProduct } from '@/app/server/controllers/AuctionProductController';

export async function GET() {
    const result = await getAuctionProductOrder();
    try{
        const getAuctionProductOrders = result.data;
        return NextResponse.json(getAuctionProductOrders);
    }catch(error){
        console.error("Error fetching getAuctionProductOrders:", error);
        return NextResponse.json({ error: "Failed to fetch Auction Product Order" }, { status: 500 });
    }
  }
