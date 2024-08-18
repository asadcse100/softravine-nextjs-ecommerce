import { NextResponse } from "next/server";
import { showAppTranslationView, storeAppTranslation } from '@/app/server/controllers/LanguageController';

export async function GET() {
  const result = await showAppTranslationView();
  try{
      const showAppTranslationView = result.data;
      return NextResponse.json(showAppTranslationView);
  }catch(error){
      console.error("Error fetching showAppTranslationView:", error);
      return NextResponse.json({ error: "Failed to fetch Show Translation View" }, { status: 500 });
  }
}
