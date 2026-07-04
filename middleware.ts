import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protect all /api/user routes, but keep landing page, about, and webhooks public.
const isProtectedRoute = createRouteMatcher([
  "/api/user(.*)",
  "/dashboard(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
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
