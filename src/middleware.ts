import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import type { Role } from './types';

export default authMiddleware({
  afterAuth(auth, req) {
    const metadata = (auth.sessionClaims as CustomJwtSessionClaims)?.metadata;

    const registered = !!auth.userId && !!metadata?.role;
    const role = registered ? (metadata?.role as Role) : null;

    // Redirect to Dashboard if user is logged in and has not completed Onboarding process.
    if (
      !registered &&
      !auth.isPublicRoute &&
      req.nextUrl.pathname !== '/dashboard'
    ) {
      const dashboard = new URL('/dashboard', req.url);
      return NextResponse.redirect(dashboard);
    }
  },
  beforeAuth(req) {
    // Add x-pathname header to the request for getting the current pathname in the server.
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-pathname', req.nextUrl.pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  publicRoutes: ['/'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
