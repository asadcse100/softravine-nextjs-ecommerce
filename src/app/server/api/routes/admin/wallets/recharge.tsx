import { NextResponse } from "next/server";
import { recharge, walletPaymentDone } from '@/app/server/controllers/WalletController'; // Import the controller function

export async function GET() {
  const result = await recharge();
  try{
      const recharges = result.data;
      return NextResponse.json(recharges);
  }catch(error){
      console.error("Error fetching recharges:", error);
      return NextResponse.json({ error: "Failed to fetch Recharges" }, { status: 500 });
  }
}
