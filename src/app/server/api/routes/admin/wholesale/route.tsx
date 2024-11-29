import { NextResponse } from "next/server";
import { getAllWholesaleProducts, createWholesaleProduct } from '@/app/server/controllers/WholesaleProductController';

export async function GET() {
  const result = await getAllWholesaleProducts();
  try{
      const wholesales = result.data;
      return NextResponse.json(wholesales);
  }catch(error){
      console.error("Error fetching wholesales:", error);
      return NextResponse.json({ error: "Failed to fetch Wholesales" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createWholesaleProduct(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Wholesale Product added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Wholesale Product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}