import { NextResponse } from "next/server";
import { index } from '@/app/server/controllers/WalletController'; // Import the controller function

export async function GET() {
  const result = await index();
  try{
      const wallets = result.data;
      return NextResponse.json(wallets);
  }catch(error){
      console.error("Error fetching wallets:", error);
      return NextResponse.json({ error: "Failed to fetch Wallets" }, { status: 500 });
  }
}