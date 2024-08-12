import { NextResponse } from "next/server";
import { offlineRecharge } from '@/app/server/controllers/WalletController'; 

export async function GET() {
  const result = await offlineRecharge();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}