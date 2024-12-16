import { NextResponse } from "next/server";
import { getCountries, createOrUpdateCountry } from '@/app/server/controllers/CountryController';

export async function GET() {
  const result = await getCountries();
  try{
      const countries = result.data;
      return NextResponse.json(countries);
  }catch(error){
      console.error("Error fetching Countries:", error);
      return NextResponse.json({ error: "Failed to fetch Countries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createOrUpdateCountry(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Country added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Country:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}