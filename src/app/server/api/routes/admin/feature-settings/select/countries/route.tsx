import { NextResponse } from "next/server";
import { selectCountries } from '@/app/server/controllers/ZoneController'; // Import the controller function

export async function GET() {
  const result = await selectCountries();
  try{
      const countries = result.data;
      return NextResponse.json(countries);
  }catch(error){
      console.error("Error fetching countries:", error);
      return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 });
  }
}