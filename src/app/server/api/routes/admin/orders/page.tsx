import { NextResponse } from "next/server";
import { storeOrder } from '@/app/server/controllers/OrderController';

export async function GET() {
  const result = await storeOrder();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
