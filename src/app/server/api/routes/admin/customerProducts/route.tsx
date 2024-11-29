import { NextResponse } from "next/server";
import { getCustomerProducts, createCustomerProduct } from '@/app/server/controllers/CustomerProductController';

export async function GET() {
  const result = await getCustomerProducts();
  try{
      const customerProducts = result.data;
      return NextResponse.json(customerProducts);
  }catch(error){
      console.error("Error fetching customerProducts:", error);
      return NextResponse.json({ error: "Failed to fetch Customer Products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createCustomerProduct(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Customer Product added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Customer Product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}