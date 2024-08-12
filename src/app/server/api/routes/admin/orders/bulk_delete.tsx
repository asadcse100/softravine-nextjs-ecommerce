import { NextResponse } from "next/server";
import { bulkDeleteOrders } from '@/app/server/controllers/OrderController';

export async function GET() {
  const result = await bulkDeleteOrders();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}