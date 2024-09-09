import { NextResponse } from "next/server";
import { getInHouseWholesaleProducts } from '@/app/server/controllers/WholesaleProductController';

export async function GET() {
  const result = await getInHouseWholesaleProducts();
  try{
      const inHouseWholesale = result.data;
      return NextResponse.json(inHouseWholesale);
  }catch(error){
      console.error("Error fetching inHouseWholesale:", error);
      return NextResponse.json({ error: "Failed to fetch InHouse Wholesale" }, { status: 500 });
  }
}
