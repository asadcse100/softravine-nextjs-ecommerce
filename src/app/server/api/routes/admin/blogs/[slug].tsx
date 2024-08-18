import { NextResponse } from "next/server";
import { getBlogDetails, getRecentBlogs } from '@/app/server/controllers/BlogController';

export async function GET() {
  const result = await getBlogDetails();
  try{
      const slug = result.data;
      return NextResponse.json(slug);
  }catch(error){
      console.error("Error fetching slug:", error);
      return NextResponse.json({ error: "Failed to fetch slug" }, { status: 500 });
  }
}
