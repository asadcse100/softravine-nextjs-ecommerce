import { NextResponse } from "next/server";
import { showAppTranslationView, storeAppTranslation } from '@/app/server/controllers/LanguageController';

export async function GET() {
  const result = await showAppTranslationView();
  try{
      const users = result.data;
      return NextResponse.json(users);
  }catch(error){
      console.error("Error fetching users:", error);
      return NextResponse.error();
  }
}
