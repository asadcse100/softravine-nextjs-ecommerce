import { NextResponse } from "next/server";
import { storePage } from '@/app/server/controllers/PageController';

export async function GET() {
  const result = await storePage();
  try{
      const pageManage = result.data;
      return NextResponse.json(pageManage);
  }catch(error){
      console.error("Error fetching pageManage:", error);
      return NextResponse.json({ error: "Failed to fetch Page Manage" }, { status: 500 });
  }
}
