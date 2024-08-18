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
