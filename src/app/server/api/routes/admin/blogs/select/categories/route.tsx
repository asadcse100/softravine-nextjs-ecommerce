import { NextResponse } from "next/server";
import { selectCategories } from '@/app/server/controllers/BlogController'; // Import the controller function

export async function GET() {
  const result = await selectCategories();
  try{
      const category = result.data;
      return NextResponse.json(category);
  }catch(error){
      console.error("Error fetching category:", error);
      return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}