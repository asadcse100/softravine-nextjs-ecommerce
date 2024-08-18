import { NextResponse } from "next/server";
import { getFollowedSellers, followSellerController } from '@/app/server/controllers/FollowSellerController';

export async function GET() {
  const result = await getFollowedSellers();
  try{
      const followedSeller = result.data;
      return NextResponse.json(followedSeller);
  }catch(error){
      console.error("Error fetching followedSeller:", error);
      return NextResponse.json({ error: "Failed to fetch followed Seller" }, { status: 500 });
  }
}
