import { NextResponse } from "next/server";
import { getAllCategories } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await getAllCategories();
  try{
      const getAllCategories = result.data;
      return NextResponse.json(getAllCategories);
  }catch(error){
      console.error("Error fetching getAllCategories:", error);
      return NextResponse.json({ error: "Failed to fetch All Categories" }, { status: 500 });
  }
}