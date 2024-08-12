import { NextResponse } from "next/server";
import { getCategories } from '@/app/server/controllers/CategoryController';

export async function GET() {
  const result = await getCategories();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
