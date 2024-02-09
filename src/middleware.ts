import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  afterAuth(auth, req) {
    // Redirect to Dashboard if user is logged in and has not completed Onboarding process.
    const publicMetadata = auth.user?.publicMetadata;
    if (auth.userId && !publicMetadata?.role) {
      const url = req.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
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
