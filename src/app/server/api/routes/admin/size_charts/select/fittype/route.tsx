import { NextResponse } from "next/server";
import { selectFitType } from '@/app/server/controllers/SizeChartController'; // Import the controller function

export async function GET() {
  const result = await selectFitType();
  try{
      const selectFitType = result.data;
      return NextResponse.json(selectFitType);
  }catch(error){
      console.error("Error fetching selectFitType:", error);
      return NextResponse.json({ error: "Failed to fetch selectFitType" }, { status: 500 });
  }
}