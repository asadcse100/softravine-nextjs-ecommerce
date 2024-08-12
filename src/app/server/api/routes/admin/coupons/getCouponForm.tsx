import { NextResponse } from "next/server";
import { getCouponForm } from '@/app/server/controllers/CouponController';

export async function GET() {
  const result = await getCouponForm();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
