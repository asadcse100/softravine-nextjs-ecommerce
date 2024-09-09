import { NextResponse } from "next/server";
import { getSizePoints } from '@/app/server/controllers/SizeChartController';

export async function GET() {
  const result = await getSizePoints();
  try{
      const getSizePoints = result.data;
      return NextResponse.json(getSizePoints);
  }catch(error){
      console.error("Error fetching getSizePoints:", error);
      return NextResponse.json({ error: "Failed to fetch Size Pont" }, { status: 500 });
  }
}
