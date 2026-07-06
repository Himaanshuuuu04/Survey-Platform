import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import dbConnect from "./dbConnect";
import User from "../models/User";

export async function getAuthenticatedUser(req: NextRequest) {
  await dbConnect();

  let clerkId: string | null = req.headers.get("x-clerk-user-id");

  if (!clerkId) {
    try {
      // Fallback to session auth
      const session = await auth();
      clerkId = session.userId;
    } catch (error) {
      console.warn("Clerk auth() helper failed or not fully configured. Checking headers.", error);
    }
  }

  if (!clerkId) {
    clerkId = req.headers.get("Authorization")?.replace("Bearer ", "") || null;
  }

  if (!clerkId) {
    return null;
  }

  // Find user by clerkId in MongoDB
  const user = await User.findOne({ clerkId });
  return user;
}
