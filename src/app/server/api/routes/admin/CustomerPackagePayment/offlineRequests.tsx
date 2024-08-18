import { NextResponse } from "next/server";
import { getOfflinePaymentRequests } from '@/app/server/controllers/CustomerPackagePaymentController';

export async function GET() {
  const result = await getOfflinePaymentRequests();
  try{
      const getOfflinePaymentRequests = result.data;
      return NextResponse.json(getOfflinePaymentRequests);
  }catch(error){
      console.error("Error fetching getOfflinePaymentRequests:", error);
      return NextResponse.json({ error: "Failed to fetch Filter Offline Payment Requests" }, { status: 500 });
  }
}
