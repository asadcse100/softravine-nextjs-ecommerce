import { NextResponse } from "next/server";
import { createSellerWholeSaleProduct, getSellerProducts } from '@/app/server/controllers/ProductController';

export async function GET() {
  const result = await getSellerProducts();
  try{
      const products = result.data;
      console.log(products);
      
      return NextResponse.json(products);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch all Product" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createSellerWholeSaleProduct(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Seller Product added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Seller Product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}