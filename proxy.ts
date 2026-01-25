import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit } from '@/lib/rateLimiter';

function getClientIp(request: NextRequest): string {
    const forwardedFor = request.headers.get('x-forwarded-for');

    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    return 'unknown';
}

export function proxy(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/precious-metals')) {
        const ip = getClientIp(request);

        const allowed = rateLimit(ip);

        if (!allowed) {
            return NextResponse.json(
                { error: 'Too many requests' },
                { status: 429 }
            );
        }
    }

    return NextResponse.next();
}
