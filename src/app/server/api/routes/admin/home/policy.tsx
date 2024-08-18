import { NextResponse } from "next/server";
import { sellerPolicy } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await sellerPolicy();
  try{
      const policy = result.data;
      return NextResponse.json(policy);
  }catch(error){
      console.error("Error fetching Policy:", error);
      return NextResponse.json({ error: "Failed to fetch Policy" }, { status: 500 });
  }
}
