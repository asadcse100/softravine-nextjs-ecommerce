import { NextResponse } from "next/server";
import { createAuctionProduct, getSellerDigitalProducts } from '@/app/server/controllers/ProductController';

export async function GET() {
  const result = await getSellerDigitalProducts();
  try{
      const products = result.data;
      console.log(products);
      
      return NextResponse.json(products);
  }catch(error){
      console.error("Error fetching products:", error);
      return NextResponse.json({ error: "Failed to fetch Auction Product" }, { status: 500 });
  }
}