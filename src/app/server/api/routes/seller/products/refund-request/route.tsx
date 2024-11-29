import { NextResponse } from "next/server";
import { vendorIndex, createRefundRequest } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await vendorIndex();
    try{
        const refundRequest = result.data;
        return NextResponse.json(refundRequest);
    }catch(error){
        console.error("Error fetching refundRequest:", error);
        return NextResponse.json({ error: "Failed to fetch Refund Request" }, { status: 500 });
    }
  }
  
export async function POST(req: Request) {
    try {
      const body = await req.json();
      const result = await createRefundRequest(body);
  
      if (result.success) {
        return NextResponse.json(
          { message: "Refund Request added successfully", data: result.data },
          { status: 201 }
        );
      }
    } catch (error) {
      console.error("Error creating new Refund Request:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }