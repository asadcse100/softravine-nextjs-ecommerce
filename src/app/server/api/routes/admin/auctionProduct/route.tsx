import { NextResponse } from "next/server";
import { createOrUpdateAuctionProduct, getAllAuctionProducts } from '@/app/server/controllers/AuctionProductController';

export async function GET() {
  const result = await getAllAuctionProducts();
  try{
      const orders = result.data;
      return NextResponse.json(orders);
  }catch(error){
      console.error("Error fetching orders:", error);
      return NextResponse.json({ error: "Failed to fetch Auction Product" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createOrUpdateAuctionProduct(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Auction Product added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Auction Product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}