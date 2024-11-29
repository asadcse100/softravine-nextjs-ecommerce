import { NextResponse } from "next/server";
import { createInhouseProduct, getInhouseProducts } from '@/app/server/controllers/ProductController';

export async function GET() {
  const result = await getInhouseProducts();
  try{
      const products = result.data;      
      return NextResponse.json(products);
  }catch(error){
      console.error("Error fetching products:", error);
      return NextResponse.json({ error: "Failed to fetch Inhouse Product" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createInhouseProduct(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Inhouse Product added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Inhouse Product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}