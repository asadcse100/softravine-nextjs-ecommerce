import { NextResponse } from "next/server";
import { getReviews, createReview } from '@/app/server/controllers/ReviewController';

export async function GET() {
    const result = await getReviews();
    try{
        const users = result.data;
        return NextResponse.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        return NextResponse.error();
    }
  }