import { NextResponse } from "next/server";
import { storeAffiliateUser } from '@/app/server/controllers/AffiliateController';

export async function GET() {
  const result = await storeAffiliateUser();
  try{
      const storeAffiliateUser = result.data;
      return NextResponse.json(storeAffiliateUser);
  }catch(error){
      console.error("Error fetching storeAffiliateUser:", error);
      return NextResponse.json({ error: "Failed to fetch Store Affiliate User" }, { status: 500 });
  }
}
