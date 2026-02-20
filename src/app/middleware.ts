import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const subdomain = host.split('.')[0]

  const url = request.nextUrl.clone()

  if (url.pathname === '/') {
    if (subdomain === 'engine') {
      url.pathname = '/engine'
      return NextResponse.rewrite(url)
    }

    if (subdomain === 'game') {
      url.pathname = '/game'
      return NextResponse.rewrite(url)
    }

    if (subdomain === 'graphics') {
      url.pathname = '/graphics'
      return NextResponse.rewrite(url)
    }

    if (subdomain === 'consultant') {
      url.pathname = '/consultant'
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}