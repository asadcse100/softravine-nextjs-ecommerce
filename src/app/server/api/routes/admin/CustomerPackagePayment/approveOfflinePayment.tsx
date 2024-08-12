import { NextResponse } from "next/server";
import { approveOfflinePayment } from '@/app/server/controllers/CustomerPackagePaymentController';

export async function GET() {
  const result = await approveOfflinePayment();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
