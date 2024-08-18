import { NextResponse } from "next/server";
import { createAuctionProduct, getAllAuctionProducts } from '@/app/server/controllers/AuctionProductController';

export async function GET() {
  const result = await getAllAuctionProducts();
  try{
      const orders = result.data;
      return NextResponse.json(orders);
  }catch(error){
      console.error("Error fetching orders:", error);
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}