import { type NextRequest, NextResponse } from 'next/server';

const rootDomain = 'mydomain.com';

function extractSubdomain(request: NextRequest): string | null {
  const hostname = request.nextUrl.hostname;

  console.log('PROXY hostname:', hostname);

  if (hostname.endsWith('.localhost')) {
    return hostname.replace('.localhost', '');
  }

  if (
    hostname !== rootDomain &&
    hostname !== `www.${rootDomain}` &&
    hostname.endsWith(`.${rootDomain}`)
  ) {
    return hostname.replace(`.${rootDomain}`, '');
  }

  return null;
}

export function proxy(request: NextRequest) {
  console.log('PROXY HIT:', request.nextUrl.href);

  const pathname = request.nextUrl.pathname;
  const subdomain = extractSubdomain(request);

  console.log('pathname:', pathname);
  console.log('subdomain:', subdomain);

  if (
    subdomain &&
    !pathname.startsWith('/s/') &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/s/${subdomain}${pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};