import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isUserDashboardRoute = createRouteMatcher(['/dashboard(.*)']);

const DEFAULT_CLERK_KEY = 'pk_test_dXAta2FuZ2Fyb28tMTA5MS5jbGVyay5hY2NvdW50cy5kZXYk';

export default clerkMiddleware(
  (auth, req) => {
    const { userId, sessionClaims } = auth();

    // 1. Unauthenticated users cannot access either /admin or /dashboard
    if ((isAdminRoute(req) || isUserDashboardRoute(req)) && !userId) {
      return auth().redirectToSignIn({ returnBackUrl: req.url });
    }

    // 2. Admin Route Protection: STRICTLY only users with role: 'admin' or 'farm_manager'
    if (isAdminRoute(req)) {
      const role = (sessionClaims?.metadata as any)?.role || (sessionClaims as any)?.role;

      // Normal users and any account without admin/farm_manager role CANNOT access /admin
      if (role !== 'admin' && role !== 'farm_manager') {
        const userDashboardUrl = new URL('/dashboard', req.url);
        return NextResponse.redirect(userDashboardUrl);
      }
    }
  },
  {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || DEFAULT_CLERK_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

