import { NextResponse } from "next/server";
import { selectBrands } from '@/app/server/controllers/BrandController'; // Import the controller function

export async function GET() {
  const result = await selectBrands();
  try{
      const roles = result.data;
      return NextResponse.json(roles);
  }catch(error){
      console.error("Error fetching roles:", error);
      return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
  }
}