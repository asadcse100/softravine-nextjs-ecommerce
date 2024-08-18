import { NextResponse } from "next/server";
import { updateBlogPost, deleteBlogPost } from '@/app/server/controllers/BlogController';

export async function GET() {
  const result = await updateBlogPost();
  try{
      const blog = result.data;
      return NextResponse.json(blog);
  }catch(error){
      console.error("Error fetching blog:", error);
      return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}
