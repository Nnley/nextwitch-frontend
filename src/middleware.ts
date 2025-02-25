import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const session = req.cookies.get('session')?.value

  const isAuthPage = req.url.includes('/account')

  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard/settings', req.url))
    }

    return NextResponse.next()
  }

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/account/:path*', '/dashboard/:path*'],
}
