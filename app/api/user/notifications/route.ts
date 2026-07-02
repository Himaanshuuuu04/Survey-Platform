import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Notification from "@/models/Notification";
import { getAuthenticatedUser } from "@/lib/authHelper";

// GET: Fetch user notifications
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    const query: Record<string, any> = { user: user._id };
    if (unreadOnly) {
      query.isRead = false;
    }

    const totalNotifications = await Notification.countDocuments(query);
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalNotifications / limit),
        totalNotifications,
      },
      data: notifications,
    });
  } catch (error: any) {
    console.error("Notifications GET Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to retrieve notifications" },
      { status: 500 }
    );
  }
}

// PUT: Mark notifications as read
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { notificationId, all } = body;

    if (all) {
      // Mark all user notifications as read
      await Notification.updateMany(
        { user: user._id, isRead: false },
        { $set: { isRead: true } }
      );
      return NextResponse.json({
        success: true,
        message: "All notifications marked as read",
      });
    }

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: "notificationId or all: true is required" },
        { status: 400 }
      );
    }

    const updatedNotification = await Notification.findOneAndUpdate(
      { _id: notificationId, user: user._id },
      { $set: { isRead: true } },
      { new: true }
    );

    if (!updatedNotification) {
      return NextResponse.json(
        { success: false, error: "Notification not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notification marked as read",
      data: updatedNotification,
    });
  } catch (error: any) {
    console.error("Notifications PUT Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update notification status" },
      { status: 500 }
    );
  }
}
