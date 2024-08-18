import { NextResponse } from "next/server";
import { createSeller, storeSeller } from '@/app/server/controllers/ShopController'; // Import the controller function

export async function GET() {
  const result = await createSeller();
  try{
      const shops = result.data;
      return NextResponse.json(shops);
  }catch(error){
      console.error("Error fetching shops:", error);
      return NextResponse.json({ error: "Failed to fetch shops" }, { status: 500 });
  }
}