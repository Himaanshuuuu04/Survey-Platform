import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protect all /api/user routes, but keep landing page, about, and webhooks public.
const isProtectedRoute = createRouteMatcher([
  "/api/user(.*)",
  "/user-dashboard(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");

  // Redirect authenticated users away from login/register directly to the dashboard
  if (userId && isAuthPage) {
    return Response.redirect(new URL("/user-dashboard", req.url));
  }

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
