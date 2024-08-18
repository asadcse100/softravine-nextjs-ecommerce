import { NextResponse } from "next/server";
import { getPickUpPoints } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getPickUpPoints();
  try{
      const getPickUpPoints = result.data;
      return NextResponse.json(getPickUpPoints);
  }catch(error){
      console.error("Error fetching getPickUpPoints:", error);
      return NextResponse.json({ error: "Failed to fetch PickUp Points" }, { status: 500 });
  }
}
