import { NextResponse } from "next/server";
import { getBlogCategories, createBlogCategory } from '@/app/server/controllers/BlogCategoryController';

export async function GET() {
  const result = await getBlogCategories();
  try{
      const blogcategories = result.data;
      return NextResponse.json(blogcategories);
  }catch(error){
      console.error("Error fetching blogcategories:", error);
      return NextResponse.json({ error: "Failed to fetch blog categories" }, { status: 500 });
  }
}
