import { NextResponse } from "next/server";
import { getAllVerifiedSellers } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getAllVerifiedSellers();
  try{
      const sellers = result.data;
      return NextResponse.json(sellers);
  }catch(error){
      console.error("Error fetching sellers:", error);
      return NextResponse.json({ error: "Failed to fetch Sellers" }, { status: 500 });
  }
}
