import { NextResponse } from "next/server";
import { purchasePackageOffline } from '@/app/server/controllers/CustomerPackageController';

export async function GET() {
  const result = await purchasePackageOffline();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}