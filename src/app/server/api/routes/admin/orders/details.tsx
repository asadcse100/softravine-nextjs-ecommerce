import { NextResponse } from "next/server";
import { getOrderDetails } from '@/app/server/controllers/OrderController';

export async function GET() {
  const result = await getOrderDetails();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
