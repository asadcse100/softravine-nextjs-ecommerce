import { NextResponse } from "next/server";
import { getShopDetails } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getShopDetails();
  try{
      const getShopDetails = result.data;
      return NextResponse.json(getShopDetails);
  }catch(error){
      console.error("Error fetching getShopDetails:", error);
      return NextResponse.json({ error: "Failed to fetch Shop Details" }, { status: 500 });
  }
}
