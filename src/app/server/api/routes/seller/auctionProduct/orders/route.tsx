import { NextResponse } from "next/server";
import { getSellerAuctionProductOrders } from '@/app/server/controllers/AuctionProductController';

export async function GET() {
  const result = await getSellerAuctionProductOrders();
  try{
      const orders = result.data;
      return NextResponse.json(orders);
  }catch(error){
      console.error("Error fetching orders:", error);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}