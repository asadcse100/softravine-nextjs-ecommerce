import { NextResponse } from "next/server";
import { getCustomerList, createUserAndCustomer } from '@/app/server/controllers/CustomerController';

export async function GET() {
  const result = await getCustomerList();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
