// proxy.ts
import { type NextRequest, NextResponse } from 'next/server';
import { rootDomain } from './lib/utils';

function extractSubdomain(request: NextRequest): string | null {
  const hostname = request.nextUrl.hostname;
  const root = rootDomain.replace(/^https?:\/\//, '').split(':')[0];

  if (hostname.endsWith('.localhost')) {
    return hostname.replace('.localhost', '');
  }

  if (
    hostname !== root &&
    hostname !== `www.${root}` &&
    hostname.endsWith(`.${root}`)
  ) {
    return hostname.replace(`.${root}`, '');
  }

  return null;
}

export function proxy(request: NextRequest) {
  return new NextResponse(`proxy hit: ${request.nextUrl.hostname}`);
}

// export function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;
//   const subdomain = extractSubdomain(request);

//   if (subdomain && !pathname.startsWith('/s/')) {
//     const url = request.nextUrl.clone();
//     url.pathname = `/s/${subdomain}${pathname}`;
//     return NextResponse.rewrite(url);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)'],
// };