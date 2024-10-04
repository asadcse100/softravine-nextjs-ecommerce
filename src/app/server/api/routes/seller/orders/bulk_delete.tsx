import { NextResponse } from "next/server";
import { bulkDeleteOrders } from '@/app/server/controllers/OrderController';

export async function GET() {
  const result = await bulkDeleteOrders();
  try{
      const bulkDelete = result.data;
      return NextResponse.json(bulkDelete);
  }catch(error){
      console.error("Error fetching bulkDelete:", error);
      return NextResponse.json({ error: "Failed to fetch Bulk Delete" }, { status: 500 });
  }
}