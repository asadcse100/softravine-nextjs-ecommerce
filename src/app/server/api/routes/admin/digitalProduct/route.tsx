import { NextResponse } from "next/server";
import { getDigitalProducts, storeProduct } from '@/app/server/controllers/DigitalProductController';

export async function GET() {
  const result = await getDigitalProducts();
  try{
      const digitalProducts = result.data;
      return NextResponse.json(digitalProducts);
  }catch(error){
      console.error("Error fetching digitalProducts:", error);
      return NextResponse.json({ error: "Failed to fetch digitalProducts" }, { status: 500 });
  }
}
