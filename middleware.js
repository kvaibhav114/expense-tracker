import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/api/add-expense', // Public API route for adding expenses
  '/api/add-income', // Public API route for adding expenses
  '/api/transactions', // Public API route for adding expenses
  '/api/total-finances',
  '/api/finances',
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    // Protect all routes except those listed as public
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
