import { NextResponse } from "next/server";
import { getAllBrands } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getAllBrands();
  try{
      const getAllBrands = result.data;
      return NextResponse.json(getAllBrands);
  }catch(error){
      console.error("Error fetching getAllBrands:", error);
      return NextResponse.json({ error: "Failed to fetch All Brands" }, { status: 500 });
  }
}