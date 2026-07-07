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

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");

  // Redirect authenticated users away from login/register directly to the dashboard
  if (userId && isAuthPage) {
    return NextResponse.redirect(new URL("/user-dashboard", req.url));
  }

  // Handle Admin Route Protection
  if (isAdminRoute(req)) {
    await auth.protect();
    
    // Check role in public metadata.
    // Ensure you assign `metadata: { role: 'admin' }` to your admin user in Clerk Dashboard.
    const role = (sessionClaims?.metadata as any)?.role;
    if (role !== "admin") {
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
