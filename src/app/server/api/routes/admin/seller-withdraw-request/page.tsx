import { NextResponse } from "next/server";
import { getSellerWithdrawRequests, storeWithdrawRequest } from '@/app/server/controllers/SellerWithdrawRequestController'; // Import the controller function

export async function GET() {
  const result = await getSellerWithdrawRequests();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
