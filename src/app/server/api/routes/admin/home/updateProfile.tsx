import { NextResponse } from "next/server";
import { updateUserProfile } from '@/app/server/controllers/HomeController';

export async function GET() {
  const result = await updateUserProfile();
  try{
      const updateUserProfile = result.data;
      return NextResponse.json(updateUserProfile);
  }catch(error){
      console.error("Error fetching updateUserProfile:", error);
      return NextResponse.json({ error: "Failed to fetch Update User Profile" }, { status: 500 });
  }
}
