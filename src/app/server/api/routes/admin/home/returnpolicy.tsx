import { NextResponse } from "next/server";
import { returnPolicy } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await returnPolicy();
  try{
      const returnPolicy = result.data;
      return NextResponse.json(returnPolicy);
  }catch(error){
      console.error("Error fetching returnPolicy:", error);
      return NextResponse.json({ error: "Failed to fetch Return Policy" }, { status: 500 });
  }
}
