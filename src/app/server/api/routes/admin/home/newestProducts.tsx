import { NextResponse } from "next/server";
import { loadNewestProductSection } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await loadNewestProductSection();
  try{
      const loadNewestProductSection = result.data;
      return NextResponse.json(loadNewestProductSection);
  }catch(error){
      console.error("Error fetching loadNewestProductSection:", error);
      return NextResponse.json({ error: "Failed to fetch Newest Product Section" }, { status: 500 });
  }
}
