import { NextResponse } from "next/server";
import { purchasePackage } from '@/app/server/controllers/CustomerPackageController';

export async function GET() {
  const result = await purchasePackage();
  try{
      const purchasePackage = result.data;
      return NextResponse.json(purchasePackage);
  }catch(error){
      console.error("Error fetching purchasePackage:", error);
      return NextResponse.json({ error: "Failed to fetch Filter Purchase Package" }, { status: 500 });
  }
}
