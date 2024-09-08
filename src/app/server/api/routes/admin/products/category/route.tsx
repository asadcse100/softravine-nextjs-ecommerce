import { NextResponse } from "next/server";
import { getCategories } from '@/app/server/controllers/CategoryController';

export async function GET() {
  const result = await getCategories();
  try{
      const products = result.data;
      return NextResponse.json(products);
  }catch(error){
      console.error("Error fetching products:", error);
      return NextResponse.json({ error: "Failed to fetch Auction Product" }, { status: 500 });
  }
}