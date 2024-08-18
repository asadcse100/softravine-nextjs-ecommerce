import { NextResponse } from "next/server";
import { getSellerWholesaleProducts } from '@/app/server/controllers/WholesaleProductController';

export async function GET() {
  const result = await getSellerWholesaleProducts();
  try{
      const sellerWholesale = result.data;
      return NextResponse.json(sellerWholesale);
  }catch(error){
      console.error("Error fetching sellerWholesale:", error);
      return NextResponse.json({ error: "Failed to fetch Seller Wholesale" }, { status: 500 });
  }
}
