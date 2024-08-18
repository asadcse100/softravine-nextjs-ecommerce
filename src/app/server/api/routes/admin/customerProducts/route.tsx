import { NextResponse } from "next/server";
import { getCustomerProducts, storeCustomerProduct } from '@/app/server/controllers/CustomerProductController';

export async function GET() {
  const result = await getCustomerProducts();
  try{
      const customerProducts = result.data;
      return NextResponse.json(customerProducts);
  }catch(error){
      console.error("Error fetching customerProducts:", error);
      return NextResponse.json({ error: "Failed to fetch Customer Products" }, { status: 500 });
  }
}
