import { NextResponse } from "next/server";
import { getCouponFormEdit } from '@/app/server/controllers/CouponController';

export async function GET() {
  const result = await getCouponFormEdit();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}