import { NextResponse } from "next/server";
import { getAllBrands, createBrand } from '@/app/server/controllers/BrandController';

export async function GET() {
  const result = await getAllBrands();
  try{
      const brands = result.data;
      return NextResponse.json(brands);
  }catch(error){
      console.error("Error fetching brands:", error);
      return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}
