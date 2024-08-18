import { NextResponse } from "next/server";
import { requestApprovalVendor } from '@/app/server/controllers/RefundRequestController';

export async function GET() {
    const result = await requestApprovalVendor();
    try{
        const requestApprovalVendor = result.data;
        return NextResponse.json(requestApprovalVendor);
    }catch(error){
        console.error("Error fetching requestApprovalVendor:", error);
        return NextResponse.json({ error: "Failed to fetch Request Approval Vendor" }, { status: 500 });
    }
  }
