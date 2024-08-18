import { NextResponse } from "next/server";
import { handleDashboard } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await handleDashboard();
  try{
      const handleDashboard = result.data;
      return NextResponse.json(handleDashboard);
  }catch(error){
      console.error("Error fetching handleDashboard:", error);
      return NextResponse.json({ error: "Failed to fetch Dashboard" }, { status: 500 });
  }
}
