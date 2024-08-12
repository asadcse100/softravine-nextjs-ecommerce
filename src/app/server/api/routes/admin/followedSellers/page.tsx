import { NextResponse } from "next/server";
import { getFollowedSellers, followSellerController } from '@/app/server/controllers/FollowSellerController';

export async function GET() {
  const result = await getFollowedSellers();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
