import { type NextRequest, NextResponse, userAgent } from 'next/server'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/_public')
    return NextResponse.redirect(new URL('/products', request.url))

  const response = NextResponse.next()
  response.headers.set('custom-header', 'custom-value')
  response.cookies.set('theme', 'light')
  return response
}

export const config = {
  matcher: ['/', '/docs', '/_public'],
}
