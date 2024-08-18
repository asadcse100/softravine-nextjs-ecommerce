import { NextResponse } from "next/server";
import { getSellers, createSeller } from '@/app/server/controllers/SellerController'; // Import the controller function

export async function GET() {
  const result = await getSellers();
  try{
      const sellers = result.data;
      return NextResponse.json(sellers);
  }catch(error){
      console.error("Error fetching sellers:", error);
      return NextResponse.json({ error: "Failed to fetch sellers" }, { status: 500 });
  }
}
