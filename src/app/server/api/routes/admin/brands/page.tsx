import { NextResponse } from "next/server";
import { getAllBrands, createBrand } from '@/app/server/controllers/BrandController';

export async function GET() {
  const result = await getAllBrands();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
