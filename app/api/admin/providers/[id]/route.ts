import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ProviderConfig from "@/models/ProviderConfig";
import { getAuthenticatedAdmin } from "@/lib/authHelper";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    // Admin check is handled by middleware
    const { id } = await params;
    const body = await req.json();

    if (typeof body.whitelistedIps === 'string') {
      body.whitelistedIps = body.whitelistedIps.split(',').map((ip: string) => ip.trim()).filter((ip: string) => ip.length > 0);
    }

    const updatedProvider = await ProviderConfig.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedProvider) {
      return NextResponse.json({ success: false, error: "Provider not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProvider });
  } catch (error: any) {
    console.error("ProviderConfig PATCH Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    // Admin check is handled by middleware
    const { id } = await params;
    
    const deletedProvider = await ProviderConfig.findByIdAndDelete(id);

    if (!deletedProvider) {
      return NextResponse.json({ success: false, error: "Provider not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deletedProvider });
  } catch (error: any) {
    console.error("ProviderConfig DELETE Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
