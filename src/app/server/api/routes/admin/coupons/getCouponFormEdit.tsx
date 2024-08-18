import { NextResponse } from "next/server";
import { getCouponFormEdit } from '@/app/server/controllers/CouponController';

export async function GET() {
  const result = await getCouponFormEdit();
  try{
      const getCouponFormEdit = result.data;
      return NextResponse.json(getCouponFormEdit);
  }catch(error){
      console.error("Error fetching getCouponFormEdit:", error);
      return NextResponse.json({ error: "Failed to fetch Filter Coupon Form Edit" }, { status: 500 });
  }
}