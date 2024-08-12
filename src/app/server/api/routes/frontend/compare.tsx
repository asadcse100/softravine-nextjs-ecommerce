import { NextResponse } from "next/server";
import { addToCompare, getCategories  } from '@/app/server/controllers/CompareController';

export async function GET() {
  const result = await addToCompare();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
