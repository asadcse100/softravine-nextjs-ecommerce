import { NextResponse } from "next/server";
import { createDigitalProduct, getDigitalProducts } from '@/app/server/controllers/ProductController';

export async function GET() {
  const result = await getDigitalProducts();
  try{
      const products = result.data;
      console.log(products);
      
      return NextResponse.json(products);
  }catch(error){
      console.error("Error fetching products:", error);
      return NextResponse.json({ error: "Failed to fetch Auction Product" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createDigitalProduct(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Digital Product added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Digital Product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}