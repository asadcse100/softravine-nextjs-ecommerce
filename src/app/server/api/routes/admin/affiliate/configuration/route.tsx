import { NextResponse } from "next/server";
import { createOrUpdateAffiliateConfiguration } from '@/app/server/controllers/AffiliateController';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createOrUpdateAffiliateConfiguration(body);

    if (result.success) {
      return NextResponse.json(
        { message: "Affiliate Configuration added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new Affiliate Configuration:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}