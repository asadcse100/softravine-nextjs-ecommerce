import { NextResponse } from "next/server";
import { getAllFlashDeals } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getAllFlashDeals();
  try{
      const getAllFlashDeals = result.data;
      return NextResponse.json(getAllFlashDeals);
  }catch(error){
      console.error("Error fetching getAllFlashDeals:", error);
      return NextResponse.json({ error: "Failed to fetch All Flash Deals" }, { status: 500 });
  }
}