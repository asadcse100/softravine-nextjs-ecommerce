import { NextResponse } from "next/server";
import { getDigitalProducts, createDigitalProduct } from '@/app/server/controllers/DigitalProductController';

export async function GET() {
  const result = await getDigitalProducts();
  try{
      const digitalProducts = result.data;
      return NextResponse.json(digitalProducts);
  }catch(error){
      console.error("Error fetching digitalProducts:", error);
      return NextResponse.json({ error: "Failed to fetch digitalProducts" }, { status: 500 });
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