import { NextResponse } from "next/server";
import { selectCustomers } from '@/app/server/controllers/CustomerController'; // Import the controller function

export async function GET() {
  const result = await selectCustomers();
  try{
      const customers = result.data;
      return NextResponse.json(customers);
  }catch(error){
      console.error("Error fetching customers:", error);
      return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}