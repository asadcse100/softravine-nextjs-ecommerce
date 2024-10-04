import { NextResponse } from "next/server";
import { getLogs } from '@/app/server/controllers/AffiliateController';

export async function GET() {
  const result = await getLogs();
  try{
      const affiliate_logs = result.data;
      return NextResponse.json(affiliate_logs);
  }catch(error){
      console.error("Error fetching affiliate_logs:", error);
      return NextResponse.json({ error: "Failed to fetch affiliate_logs" }, { status: 500 });
  }
}
