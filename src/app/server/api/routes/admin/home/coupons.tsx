import { NextResponse } from "next/server";
import { getAllCoupons } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getAllCoupons();
  try{
      const getAllCoupons = result.data;
      return NextResponse.json(getAllCoupons);
  }catch(error){
      console.error("Error fetching getAllCoupons:", error);
      return NextResponse.json({ error: "Failed to fetch All Coupons" }, { status: 500 });
  }
}