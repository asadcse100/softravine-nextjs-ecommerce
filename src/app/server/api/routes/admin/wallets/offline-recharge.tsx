import { NextResponse } from "next/server";
import { offlineRecharge } from '@/app/server/controllers/WalletController'; 

export async function GET() {
  const result = await offlineRecharge();
  try{
      const offlineRecharge = result.data;
      return NextResponse.json(offlineRecharge);
  }catch(error){
      console.error("Error fetching offlineRecharge:", error);
      return NextResponse.json({ error: "Failed to fetch Offline Recharge" }, { status: 500 });
  }
}