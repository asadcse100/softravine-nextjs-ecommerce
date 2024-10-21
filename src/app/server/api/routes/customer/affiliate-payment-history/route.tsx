import { NextResponse } from "next/server";
import { customerPaymentHistories } from '@/app/server/controllers/AffiliateController';

export async function GET() {
  const result = await customerPaymentHistories();
  try{
      const customerPaymentHistories = result.data;
      return NextResponse.json(customerPaymentHistories);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Wallet" }, { status: 500 });
  }
}