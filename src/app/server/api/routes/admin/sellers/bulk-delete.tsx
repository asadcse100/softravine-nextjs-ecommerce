import { NextResponse } from "next/server";
import { updateSeller, deleteSeller } from '@/app/server/controllers/SellerController';

export async function GET() {
  const result = await updateSeller();
  try{
      const bulkDelete = result.data;
      return NextResponse.json(bulkDelete);
  }catch(error){
      console.error("Error fetching bulkDelete:", error);
      return NextResponse.json({ error: "Failed to fetch Bulk Delete" }, { status: 500 });
  }
}
