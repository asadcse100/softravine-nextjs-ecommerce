import { NextResponse } from "next/server";
import { getDigitalProducts, storeProduct } from '@/app/server/controllers/DigitalProductController';

export async function GET() {
  const result = await getDigitalProducts();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
