import { NextResponse } from "next/server";
import { purchasePackageOffline } from '@/app/server/controllers/CustomerPackageController';

export async function GET() {
  const result = await purchasePackageOffline();
  try{
      const purchasePackageOffline = result.data;
      return NextResponse.json(purchasePackageOffline);
  }catch(error){
      console.error("Error fetching purchasePackageOffline:", error);
      return NextResponse.json({ error: "Failed to fetch Filter Purchase Package Offline" }, { status: 500 });
  }
}