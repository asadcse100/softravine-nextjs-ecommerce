import { NextResponse } from "next/server";
import { customerSentRefundRequest } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
  const result = await customerSentRefundRequest();
  try{
      const customerSentRefundRequest = result.data;
      return NextResponse.json(customerSentRefundRequest);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Sent Refund Request" }, { status: 500 });
  }
}