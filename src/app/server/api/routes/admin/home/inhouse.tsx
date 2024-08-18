import { NextResponse } from "next/server";
import { getAllInHouseProducts } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getAllInHouseProducts();
  try{
      const getAllInHouseProducts = result.data;
      return NextResponse.json(getAllInHouseProducts);
  }catch(error){
      console.error("Error fetching getAllInHouseProducts:", error);
      return NextResponse.json({ error: "Failed to fetch All InHouse Products" }, { status: 500 });
  }
}
