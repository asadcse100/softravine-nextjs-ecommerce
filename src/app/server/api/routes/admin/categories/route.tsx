import { NextResponse } from "next/server";
import { getCategories, createOrUpdateCategory } from '@/app/server/controllers/CategoryController';

export async function GET() {
  const result = await getCategories();
  try{
      const categories = result.data;
      return NextResponse.json(categories);
  }catch(error){
      console.error("Error fetching categories:", error);
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createOrUpdateCategory(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Category added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Category:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
