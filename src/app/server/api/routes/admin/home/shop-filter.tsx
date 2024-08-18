import { NextResponse } from "next/server";
import { filterShop } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await filterShop();
  try{
      const filterShop = result.data;
      return NextResponse.json(filterShop);
  }catch(error){
      console.error("Error fetching filterShop:", error);
      return NextResponse.json({ error: "Failed to fetch Filter Shop" }, { status: 500 });
  }
}
