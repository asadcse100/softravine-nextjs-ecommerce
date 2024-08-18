import { NextResponse } from "next/server";
import { getFlashDealDetails } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getFlashDealDetails();
  try{
      const getFlashDealDetails = result.data;
      return NextResponse.json(getFlashDealDetails);
  }catch(error){
      console.error("Error fetching getFlashDealDetails:", error);
      return NextResponse.json({ error: "Failed to fetch Flash Deal Details" }, { status: 500 });
  }
}
