import { NextResponse } from "next/server";
import { getOfflinePaymentRequests } from '@/app/server/controllers/CustomerPackagePaymentController';

export async function GET() {
  const result = await getOfflinePaymentRequests();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
