import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Protect regular user routes
const isProtectedRoute = createRouteMatcher([
  "/api/user(.*)",
  "/user-dashboard(.*)"
]);

// Protect admin routes strictly
const isAdminRoute = createRouteMatcher([
  "/api/admin(.*)",
  "/admin(.*)"
]);

export const proxy = clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");

  // Redirect authenticated users away from login/register directly to the dashboard
  if (userId && isAuthPage) {
    return NextResponse.redirect(new URL("/user-dashboard", req.url));
  }

  // Handle Admin Route Protection
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();
    await auth.protect();
    
    let role = (sessionClaims?.metadata as any)?.role || (sessionClaims?.publicMetadata as any)?.role;

    // Fallback: Fetch Clerk user object if claim is not configured/present
    if (!role && userId) {
      try {
        const { createClerkClient } = await import("@clerk/nextjs/server");
        const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
        const clerkUser = await clerkClient.users.getUser(userId);
        role = clerkUser.publicMetadata?.role;
      } catch (err) {
        console.error("Error fetching user from Clerk in middleware:", err);
      }
    }

    if (role !== "admin") {
      if (req.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/user-dashboard", req.url));
    }
  }

  // Handle User Route Protection
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.[\\w]+$|_next/image|_next/static|favicon.ico|sitemap.xml|robots.txt).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
