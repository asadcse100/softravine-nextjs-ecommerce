import { NextResponse } from "next/server";
import { getSizeCharts } from '@/app/server/controllers/SizeChartController';

export async function GET() {
  const result = await getSizeCharts();
  try{
      const getSizeCharts = result.data;
      return NextResponse.json(getSizeCharts);
  }catch(error){
      console.error("Error fetching getSizeCharts:", error);
      return NextResponse.json({ error: "Failed to fetch Size Charts" }, { status: 500 });
  }
}
