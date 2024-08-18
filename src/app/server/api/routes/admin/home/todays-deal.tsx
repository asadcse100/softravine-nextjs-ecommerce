import { NextResponse } from "next/server";
import { getTodaysDealProducts } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getTodaysDealProducts();
  try{
      const getTodaysDealProducts = result.data;
      return NextResponse.json(getTodaysDealProducts);
  }catch(error){
      console.error("Error fetching getTodaysDealProducts:", error);
      return NextResponse.json({ error: "Failed to fetch Todays Deal Products" }, { status: 500 });
  }
}
