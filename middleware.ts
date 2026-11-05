import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isUserDashboardRoute = createRouteMatcher(['/dashboard(.*)']);

const DEFAULT_CLERK_KEY = 'pk_test_dXAta2FuZ2Fyb28tMTA5MS5jbGVyay5hY2NvdW50cy5kZXYk';
const DEFAULT_CLERK_SECRET_KEY = 'sk_test_Htna3ETdslIAjQTMbNeHnpv9Jfv928C1zN2GoYfR49';

const clerkHandler = clerkMiddleware(
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
    secretKey: process.env.CLERK_SECRET_KEY || DEFAULT_CLERK_SECRET_KEY,
  }
);

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  try {
    return await clerkHandler(req, event);
  } catch (err) {
    console.error('Clerk Edge Middleware caught error:', err);
    // Graceful fallback for protected routes
    if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/dashboard')) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
    return NextResponse.next();
  }
}

export const config = {
  // Only invoke middleware on protected admin & customer dashboard routes
  matcher: ['/admin(.*)', '/dashboard(.*)'],
};

