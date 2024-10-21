import { NextResponse } from "next/server";
import { createAuctionProduct, getSellerAllAuctionProducts } from '@/app/server/controllers/AuctionProductController';

export async function GET() {
  const result = await getSellerAllAuctionProducts();
  try{
      const orders = result.data;
      return NextResponse.json(orders);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Auction Product" }, { status: 500 });
  }
}