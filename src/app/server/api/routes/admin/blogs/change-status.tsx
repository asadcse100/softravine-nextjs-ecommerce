import { NextResponse } from "next/server";
import { changeBlogPostStatus } from '@/app/server/controllers/BlogController';

export async function GET() {
  const result = await changeBlogPostStatus();
  try{
      const changeBlogPostStatus = result.data;
      return NextResponse.json(changeBlogPostStatus);
  }catch(error){
      console.error("Error fetching changeBlogPostStatus:", error);
      return NextResponse.json({ error: "Failed to fetch Change Blog Post Status" }, { status: 500 });
  }
}
