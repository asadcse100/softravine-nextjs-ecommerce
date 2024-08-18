import { NextResponse } from "next/server";
import { getCustomerList, createUserAndCustomer } from '@/app/server/controllers/CustomerController';

export async function GET() {
  const result = await getCustomerList();
  try{
      const customers = result.data;
      return NextResponse.json(customers);
  }catch(error){
      console.error("Error fetching customers:", error);
      return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}
