import { NextResponse } from "next/server";
import { getCouponForm } from '@/app/server/controllers/CouponController';

export async function GET() {
  const result = await getCouponForm();
  try{
      const getCouponForm = result.data;
      return NextResponse.json(getCouponForm);
  }catch(error){
      console.error("Error fetching getCouponForm:", error);
      return NextResponse.json({ error: "Failed to fetch Filter Coupon Form" }, { status: 500 });
  }
}
