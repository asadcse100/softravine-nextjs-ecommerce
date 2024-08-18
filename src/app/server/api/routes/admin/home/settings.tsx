import { NextResponse } from "next/server";
import { updateTop10Settings } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await updateTop10Settings();
  try{
      const updateTop10Settings = result.data;
      return NextResponse.json(updateTop10Settings);
  }catch(error){
      console.error("Error fetching updateTop10Settings:", error);
      return NextResponse.json({ error: "Failed to fetch Update Top 10Settings" }, { status: 500 });
  }
}
