import { NextResponse } from "next/server";
import { getCategoryItems } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getCategoryItems();
  try{
      const getCategoryItems = result.data;
      return NextResponse.json(getCategoryItems);
  }catch(error){
      console.error("Error fetching getCategoryItems:", error);
      return NextResponse.json({ error: "Failed to fetch Category Items" }, { status: 500 });
  }
}
