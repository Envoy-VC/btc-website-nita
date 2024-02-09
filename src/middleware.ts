import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  afterAuth(auth, req) {
    // Redirect to Dashboard if user is logged in and has not completed Onboarding process.
    const metadata = auth.sessionClaims?.metadata as Record<
      string,
      string | number | undefined
    >;

    if (
      auth.userId &&
      req.nextUrl.pathname !== '/dashboard' &&
      !auth.isPublicRoute &&
      !metadata?.role
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
