import { NextResponse } from "next/server";
import { createAuctionProduct, getSellerAllAuctionProducts } from '@/app/server/controllers/seller/SellerAuctionProductController';

export async function GET() {
  const result = await getSellerAllAuctionProducts();
  try{
      const orders = result.data;
      return NextResponse.json(orders);
  }catch(error){
      return NextResponse.json({ error: "Failed to fetch Auction Product" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createAuctionProduct(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Zone added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Zone:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}