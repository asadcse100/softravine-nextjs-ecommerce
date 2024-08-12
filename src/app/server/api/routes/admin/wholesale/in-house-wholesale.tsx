import { NextResponse } from "next/server";
import { getInHouseWholesaleProducts } from '@/app/server/controllers/WholesaleProductController';

export async function GET() {
  const result = await getInHouseWholesaleProducts();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
