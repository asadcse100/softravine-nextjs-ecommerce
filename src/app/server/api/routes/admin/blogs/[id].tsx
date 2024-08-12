import { NextResponse } from "next/server";
import { updateBlogPost, deleteBlogPost } from '@/app/server/controllers/BlogController';

export async function GET() {
  const result = await updateBlogPost();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
