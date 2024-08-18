import { NextResponse } from "next/server";
import { supportPolicy } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await supportPolicy();
  try{
      const supportPolicy = result.data;
      return NextResponse.json(supportPolicy);
  }catch(error){
      console.error("Error fetching supportPolicy:", error);
      return NextResponse.json({ error: "Failed to fetch Support Policy" }, { status: 500 });
  }
}
