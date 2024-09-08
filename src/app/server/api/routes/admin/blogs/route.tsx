import { NextResponse } from "next/server";
import { getAllBlogs, createBlogPost } from '@/app/server/controllers/BlogController';

export async function GET() {
  const result = await getAllBlogs();
  try{
      const blogs = result.data;
      
      return NextResponse.json(blogs);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
