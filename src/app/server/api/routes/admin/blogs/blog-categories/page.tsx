import { NextResponse } from "next/server";
import { getBlogCategories, createBlogCategory } from '@/app/server/controllers/BlogCategoryController';

export async function GET() {
  const result = await getBlogCategories();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
