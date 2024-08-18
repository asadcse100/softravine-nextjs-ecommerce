import { NextResponse } from "next/server";
import { getPremiumPackages } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getPremiumPackages();
  try{
      const getPremiumPackages = result.data;
      return NextResponse.json(getPremiumPackages);
  }catch(error){
      console.error("Error fetching getPremiumPackages:", error);
      return NextResponse.json({ error: "Failed to fetch Premium Packages" }, { status: 500 });
  }
}
