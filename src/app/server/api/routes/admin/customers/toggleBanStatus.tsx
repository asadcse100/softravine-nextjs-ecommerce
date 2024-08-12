import { NextResponse } from "next/server";
import { toggleUserBanStatus } from '@/app/server/controllers/CustomerController';

export async function GET() {
  const result = await toggleUserBanStatus();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
