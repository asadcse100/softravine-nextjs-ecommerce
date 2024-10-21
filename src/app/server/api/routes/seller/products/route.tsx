import { NextResponse } from "next/server";
import { createAuctionProduct, getSellerProducts } from '@/app/server/controllers/ProductController';

export async function GET() {
  const result = await getSellerProducts();
  try{
      const products = result.data;
      console.log(products);
      
      return NextResponse.json(products);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch all Product" }, { status: 500 });
  }
}