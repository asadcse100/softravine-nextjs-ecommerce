import { NextResponse } from "next/server";
import { index, store } from '@/app/server/controllers/CouponController';

export async function GET() {
  const result = await index();
  try{
      const coupons = result.data;
      return NextResponse.json(coupons);
  }catch(error){
      console.error("Error fetching coupons:", error);
      return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
  }
}
