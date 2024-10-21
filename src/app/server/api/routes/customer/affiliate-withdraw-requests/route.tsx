import { NextResponse } from "next/server";
import { customerWithdrawRequest } from '@/app/server/controllers/AffiliateController';

export async function GET() {
  const result = await customerWithdrawRequest();
  try{
      const customerWithdrawRequest = result.data;
      return NextResponse.json(customerWithdrawRequest);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Wallet" }, { status: 500 });
  }
}