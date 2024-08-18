import { NextResponse } from "next/server";
import { getCategories } from '@/app/server/controllers/WholesaleProductController';

export async function GET() {
  const result = await getCategories();
  try{
      const wholesaleCategories = result.data;
      return NextResponse.json(wholesaleCategories);
  }catch(error){
      console.error("Error fetching wholesaleCategories:", error);
      return NextResponse.json({ error: "Failed to fetch Wholesale Categories" }, { status: 500 });
  }
}