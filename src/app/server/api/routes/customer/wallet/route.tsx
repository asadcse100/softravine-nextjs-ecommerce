import { NextResponse } from "next/server";
import { customerWallet } from '@/app/server/controllers/WalletController';

export async function GET() {
  const result = await customerWallet();
  try{
      const customerWallet = result.data;
      return NextResponse.json(customerWallet);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Wallet" }, { status: 500 });
  }
}