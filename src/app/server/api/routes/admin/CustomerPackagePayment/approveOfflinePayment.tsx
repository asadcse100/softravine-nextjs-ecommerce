import { NextResponse } from "next/server";
import { approveOfflinePayment } from '@/app/server/controllers/CustomerPackagePaymentController';

export async function GET() {
  const result = await approveOfflinePayment();
  try{
      const approveOfflinePayment = result.data;
      return NextResponse.json(approveOfflinePayment);
  }catch(error){
      console.error("Error fetching approveOfflinePayment:", error);
      return NextResponse.json({ error: "Failed to fetch Filter Approve Offline Payment" }, { status: 500 });
  }
}
