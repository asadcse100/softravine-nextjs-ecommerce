// app/api/product/route.ts (Using Next.js 13+ with the App Router)
import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma"; // Adjust this path to match your Prisma client setup
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const { product_name } = body;

    // Validate input
    if (typeof product_name !== "boolean") {
      return NextResponse.json(
        { success: false, message: "Invalid product_name value." },
        { status: 400 }
      );
    }

    // Save to database using Prisma
    const product = await prisma.product.create({
      data: { product_name },
    });

    // Return success response
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("API Error:", error);

    // Handle server errors
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

