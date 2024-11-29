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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createBlogPost(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Blog Post added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Blog Post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}