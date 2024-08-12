import { NextResponse } from "next/server";
import { getAllBlogs, createBlogPost } from '@/app/server/controllers/BlogController';

export async function GET() {
  const result = await getAllBlogs();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
