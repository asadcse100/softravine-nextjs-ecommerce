import { NextResponse } from "next/server";
import { getCategories } from '@/app/server/controllers/CategoryController';

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
