import { NextResponse } from "next/server";
import { getReferralUsers } from '@/app/server/controllers/AffiliateController';

export async function GET() {
  const result = await getReferralUsers();
  try{
      const referral_user = result.data;
      return NextResponse.json(referral_user);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch referral user" }, { status: 500 });
  }
}
