import { NextResponse } from "next/server";
import { followSellerController } from '@/app/server/controllers/FollowSellerController';

export async function GET() {
    const result = await unfollowSeller();
    try{
        const unfollowSellerController = result.data;
        return NextResponse.json(unfollowSellerController);
    }catch(error){
        console.error("Error fetching unfollowSellerController:", error);
        return NextResponse.json({ error: "Failed to fetch Unfollow Seller" }, { status: 500 });
    }
  }
