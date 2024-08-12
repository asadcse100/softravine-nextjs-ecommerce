import { NextResponse } from "next/server";
import { storeAffiliateUser } from '@/app/server/controllers/AffiliateController';

export async function GET() {
  const result = await storeAffiliateUser();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
