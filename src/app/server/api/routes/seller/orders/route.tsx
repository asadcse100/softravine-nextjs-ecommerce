import { NextResponse } from "next/server";
import { getAllOrders } from '@/app/server/controllers/OrderController';

export async function GET() {
  const result = await getAllOrders();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
