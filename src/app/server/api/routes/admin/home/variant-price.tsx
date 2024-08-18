import { NextResponse } from "next/server";
import { variantPrice } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await variantPrice();
  try{
      const variantPrice = result.data;
      return NextResponse.json(variantPrice);
  }catch(error){
      console.error("Error fetching variantPrice:", error);
      return NextResponse.json({ error: "Failed to fetch Variant Price" }, { status: 500 });
  }
}
