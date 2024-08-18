import { NextResponse } from "next/server";
import { addToCompare, getCategories  } from '@/app/server/controllers/CompareController';

export async function GET() {
  const result = await addToCompare();
  try{
      const compare = result.data;
      return NextResponse.json(compare);
  }catch(error){
      console.error("Error fetching compare:", error);
      return NextResponse.json({ error: "Failed to fetch Compare" }, { status: 500 });
  }
}
