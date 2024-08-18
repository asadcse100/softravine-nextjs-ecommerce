import { NextResponse } from "next/server";
import { getSellerWholesaleProducts } from '@/app/server/controllers/WholesaleProductController';

export async function GET() {
  const result = await getSellerWholesaleProducts();
  try{
      const sellerWholesales = result.data;
      return NextResponse.json(sellerWholesales);
  }catch(error){
      console.error("Error fetching sellerWholesales:", error);
      return NextResponse.json({ error: "Failed to fetch Seller Wholesales" }, { status: 500 });
  }
}
