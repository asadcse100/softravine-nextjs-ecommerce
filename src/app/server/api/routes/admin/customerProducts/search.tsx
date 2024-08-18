import { NextResponse } from "next/server";
import { search } from '@/app/server/controllers/CustomerProductController';

export async function GET() {
  const result = await search();
  try{
      const search = result.data;
      return NextResponse.json(search);
  }catch(error){
      console.error("Error fetching search:", error);
      return NextResponse.json({ error: "Failed to fetch Search" }, { status: 500 });
  }
}
