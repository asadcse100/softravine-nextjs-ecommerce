import { NextResponse } from "next/server";
import { selectProducts } from '@/app/server/controllers/ProductController'; // Import the controller function

export async function GET() {
  const result = await selectProducts();
  try{
      const products = result.data;
      return NextResponse.json(products);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}