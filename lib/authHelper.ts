import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import dbConnect from "./dbConnect";
import User from "../models/User";

export async function getAuthenticatedUser(req: NextRequest) {
  await dbConnect();

  let clerkId: string | null = null;

  try {
    // 1. Try to get clerkId from standard Clerk server helper
    const session = await auth();
    clerkId = session.userId;
  } catch (error) {
    console.warn("Clerk auth() helper failed or not fully configured. Checking headers.", error);
  }

  // 2. Fallback: Allow custom headers for testing/development (e.g. from Postman or local curl)
  if (!clerkId) {
    clerkId = req.headers.get("x-clerk-user-id") || req.headers.get("Authorization")?.replace("Bearer ", "") || null;
  }

  if (!clerkId) {
    return null;
  }

  // Find user by clerkId in MongoDB
  const user = await User.findOne({ clerkId });
  return user;
}
