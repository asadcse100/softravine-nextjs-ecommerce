import { NextResponse } from "next/server";
import { getAllWholesaleProducts } from '@/app/server/controllers/WholesaleProductController';

export async function GET() {
  const result = await getAllWholesaleProducts();
  try{
      const wholesales = result.data;
      return NextResponse.json(wholesales);
  }catch(error){
      console.error("Error fetching wholesales:", error);
      return NextResponse.json({ error: "Failed to fetch Wholesales" }, { status: 500 });
  }
}