import { NextResponse } from "next/server";
import { getPurchaseHistories } from '@/app/server/controllers/PurchaseHistoryController';

export async function GET() {
  const result = await getPurchaseHistories();
  try{
      const getPurchaseHistories = result.data;
      return NextResponse.json(getPurchaseHistories);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Purchase Histories" }, { status: 500 });
  }
}