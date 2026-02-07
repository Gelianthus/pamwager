type RateLimitEntry = {
    count: number;
    lastReq: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const TIME = 120 * 1000;
const MAX_REQ = 80;

export function rateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry) {
        rateLimitMap.set(ip, { count: 1, lastReq: now });
        return true;
    }

    if (now - entry.lastReq > TIME) {
        rateLimitMap.set(ip, { count: 1, lastReq: now });
        return true;
    } 

     if (entry.count >= MAX_REQ) {
        return false;
    }

    entry.count += 1;

    return true;
}