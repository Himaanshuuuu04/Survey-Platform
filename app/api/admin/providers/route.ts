import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProviderConfig from "@/models/ProviderConfig";
import { getAuthenticatedAdmin } from "@/lib/authHelper";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    // Admin check is handled by middleware
    const providers = await ProviderConfig.find({}).sort({ providerName: 1 });
    
    return NextResponse.json({ success: true, data: providers });
  } catch (error: any) {
    console.error("ProviderConfig GET Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    // Admin check is handled by middleware
    const body = await req.json();
    
    // Convert comma separated string to array if needed for IPs
    if (typeof body.whitelistedIps === 'string') {
      body.whitelistedIps = body.whitelistedIps.split(',').map((ip: string) => ip.trim()).filter((ip: string) => ip.length > 0);
    }

    const newProvider = await ProviderConfig.create(body);
    
    return NextResponse.json({ success: true, data: newProvider });
  } catch (error: any) {
    console.error("ProviderConfig POST Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
