import { NextResponse } from "next/server";
import { getProductDetails } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getProductDetails();
  try{
      const getProductDetails = result.data;
      return NextResponse.json(getProductDetails);
  }catch(error){
      console.error("Error fetching getProductDetails:", error);
      return NextResponse.json({ error: "Failed to fetch Product Details" }, { status: 500 });
  }
}
