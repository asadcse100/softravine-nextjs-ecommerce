import { NextResponse } from "next/server";
import { affiliateOptionStore } from '@/app/server/controllers/AffiliateController';

export async function GET() {
  const result = await affiliateOptionStore();
  try{
      const affiliateOption = result.data;
      return NextResponse.json(affiliateOption);
  }catch(error){
      console.error("Error fetching affiliateOptionStore:", error);
      return NextResponse.json({ error: "Failed to fetch Affiliate Option" }, { status: 500 });
  }
}
