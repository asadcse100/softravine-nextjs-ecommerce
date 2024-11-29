import { NextResponse } from "next/server";
import { getCategories, createCategory } from '@/app/server/controllers/CategoryController';

export async function GET() {
  const result = await getCategories();
  try{
      const products = result.data;
      return NextResponse.json(products);
  }catch(error){
      console.error("Error fetching products:", error);
      return NextResponse.json({ error: "Failed to fetch Auction Product" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createCategory(body);

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