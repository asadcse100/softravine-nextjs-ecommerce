import { NextResponse } from "next/server";
import { getBlogCategories, createBlogCategory } from '@/app/server/controllers/BlogCategoryController';

export async function GET() {
  try {
    const result = await getBlogCategories();
    const blogcategories = result.data;
    return NextResponse.json(blogcategories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blog categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createBlogCategory(body.category_name);

    if (result.success) {
      return NextResponse.json(
        { message: "Category added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}