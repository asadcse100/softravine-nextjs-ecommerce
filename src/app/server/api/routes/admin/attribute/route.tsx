import { NextResponse } from "next/server";
import { getAttributes } from '@/app/server/controllers/AttributeController';

export async function GET() {
  const result = await getAttributes();
  try{
      const attributes = result.data;
      return NextResponse.json(attributes);
  }catch(error){
      console.error("Error fetching attributes:", error);
      return NextResponse.json({ error: "Failed to fetch attributes" }, { status: 500 });
  }
}
