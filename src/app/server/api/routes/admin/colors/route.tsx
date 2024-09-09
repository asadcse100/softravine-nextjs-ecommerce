import { NextResponse } from "next/server";
import { getColors } from '@/app/server/controllers/ColorController';

export async function GET() {
  const result = await getColors();
  try{
      const colors = result.data;
      return NextResponse.json(colors);
  }catch(error){
      console.error("Error fetching colors:", error);
      return NextResponse.json({ error: "Failed to fetch colors" }, { status: 500 });
  }
}
