import { NextResponse } from "next/server";
import { getSellerWithdrawRequests, storeWithdrawRequest } from '@/app/server/controllers/SellerWithdrawRequestController'; // Import the controller function

export async function GET() {
  const result = await getSellerWithdrawRequests();
  try{
      const sellerWithdrawRequests = result.data;
      return NextResponse.json(sellerWithdrawRequests);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Seller Withdraw Requests" }, { status: 500 });
  }
}
