import { NextResponse } from "next/server";
import { getAllCustomerPackages, createCustomerPackage } from '@/app/server/controllers/CustomerPackageController';

export async function GET() {
  const result = await getAllCustomerPackages();
  try{
      const customerPackages = result.data;
      return NextResponse.json(customerPackages);
  }catch(error){
      console.error("Error fetching customerPackages:", error);
      return NextResponse.json({ error: "Failed to fetch Customer Packages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await createCustomerPackage(body);

    if (result.success) {
      return NextResponse.json(
        { message: "CustomerPackage added successfully", data: result.data },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating new CustomerPackage:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}