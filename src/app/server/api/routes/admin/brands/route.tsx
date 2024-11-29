import { NextResponse } from "next/server";
import { getAllBrands, createBrand } from '@/app/server/controllers/BrandController';

export async function GET() {
  const result = await getAllBrands(null);
  try{
      const brands = result.data;
      return NextResponse.json(brands);
  }catch(error){
      console.error("Error fetching brands:", error);
      return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createBrand(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Brand added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Brand:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}