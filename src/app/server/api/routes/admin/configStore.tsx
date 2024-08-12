import { NextResponse } from "next/server";
import { configStore } from '@/app/server/controllers/AffiliateController';

export async function GET() {
  const result = await configStore();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
