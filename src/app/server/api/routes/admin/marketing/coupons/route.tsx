import { NextResponse } from "next/server";
import { index, createCoupon } from '@/app/server/controllers/CouponController';

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createCoupon(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Coupon added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Coupon:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}