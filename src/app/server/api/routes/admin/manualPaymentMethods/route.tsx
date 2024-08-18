import { NextResponse } from "next/server";
import { getManualPaymentMethods, storeManualPaymentMethod } from '@/app/server/controllers/ManualPaymentMethodController';

export async function GET() {
  const result = await getManualPaymentMethods();
  try{
      const manualPayments = result.data;
      return NextResponse.json(manualPayments);
  }catch(error){
      console.error("Error fetching manualPayments:", error);
      return NextResponse.json({ error: "Failed to fetch Manual Payments" }, { status: 500 });
  }
}
