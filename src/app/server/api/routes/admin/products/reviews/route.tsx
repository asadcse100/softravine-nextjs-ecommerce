import { NextResponse } from "next/server";
import { getReviews, createReview } from '@/app/server/controllers/ReviewController';

export async function GET() {
    const result = await getReviews();
    try{
        const reviews = result.data;
        return NextResponse.json(reviews);
    }catch(error){
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch Reviews" }, { status: 500 });
    }
  }