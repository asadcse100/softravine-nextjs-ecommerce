import { NextResponse } from "next/server";
import { purchasePaymentDone } from '@/app/server/controllers/CustomerPackageController';

export async function GET() {
  const result = await purchasePaymentDone();
  try{
      const purchasePaymentDone = result.data;
      return NextResponse.json(purchasePaymentDone);
  }catch(error){
      console.error("Error fetching purchasePaymentDone:", error);
      return NextResponse.json({ error: "Failed to fetch Filter Purchase Payment Done" }, { status: 500 });
  }
}
