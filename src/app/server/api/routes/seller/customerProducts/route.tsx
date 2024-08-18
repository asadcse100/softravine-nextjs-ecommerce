import { NextResponse } from "next/server";
import { getUserProducts } from '@/app/server/controllers/CustomerProductController';

export async function GET() {
  const result = await getUserProducts();
  try{
      const customerProducts = result.data;
      return NextResponse.json(customerProducts);
  }catch(error){
      console.error("Error fetching customerProducts:", error);
      return NextResponse.json({ error: "Failed to fetch Customer Products" }, { status: 500 });
  }
}