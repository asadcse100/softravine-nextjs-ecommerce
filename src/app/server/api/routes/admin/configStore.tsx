import { NextResponse } from "next/server";
import { configStore } from '@/app/server/controllers/AffiliateController';

export async function GET() {
  const result = await configStore();
  try{
      const configStore = result.data;
      return NextResponse.json(configStore);
  }catch(error){
      console.error("Error fetching configStore:", error);
      return NextResponse.json({ error: "Failed to fetch Config Store" }, { status: 500 });
  }
}
