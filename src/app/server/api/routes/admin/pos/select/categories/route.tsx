import { NextResponse } from "next/server";
import { selectCategories } from '@/app/server/controllers/CategoryController'; // Import the controller function

export async function GET() {
  const result = await selectCategories();
  try{
      const roles = result.data;
      return NextResponse.json(roles);
  }catch(error){
      console.error("Error fetching roles:", error);
      return NextResponse.json({ error: "Failed to fetch roles" }, { status: 500 });
  }
}