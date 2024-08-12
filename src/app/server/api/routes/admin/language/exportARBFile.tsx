import { NextResponse } from "next/server";
import { exportARBFile } from '@/app/server/controllers/LanguageController';

export async function GET() {
  const result = await exportARBFile();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
