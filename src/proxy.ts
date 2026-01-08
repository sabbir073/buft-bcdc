import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
  // Get the pathname
  const { pathname } = request.nextUrl;

  // Check if the route is protected (admin dashboard)
  if (pathname.startsWith('/admin/dashboard')) {
    // Get the token from the request
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
