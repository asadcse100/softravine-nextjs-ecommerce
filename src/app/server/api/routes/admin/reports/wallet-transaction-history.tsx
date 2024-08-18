import { NextResponse } from "next/server";
import { getWalletTransactionHistory } from '@/app/server/controllers/ReportController';

export async function GET() {
    const result = await getWalletTransactionHistory();
    try{
        const getWalletTransactionHistory = result.data;
        return NextResponse.json(getWalletTransactionHistory);
    }catch(error){
        console.error("Error fetching getWalletTransactionHistory:", error);
        return NextResponse.json({ error: "Failed to fetch Wallet Transaction History" }, { status: 500 });
    }
  }