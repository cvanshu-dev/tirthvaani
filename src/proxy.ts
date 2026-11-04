import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

type RedirectEntry = {
  target: string;
  status: "MOVED_PERMANENTLY" | "FOUND";
};

let redirectCache: Map<string, RedirectEntry> | null = null;
let redirectCacheExpiresAt = 0;
let maintenanceMode = false;

export async function proxy(request: NextRequest) {
  if (!process.env.DATABASE_URL) return NextResponse.next();
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  if (!redirectCache || Date.now() >= redirectCacheExpiresAt) {
    try {
      const db = getPrisma();
      const [rows, settings] = db
        ? await Promise.all([
            db.redirect.findMany({
              where: { enabled: true },
              select: { source: true, target: true, status: true },
            }),
            db.globalSettings.findUnique({
              where: { id: "global" },
              select: { data: true },
            }),
          ])
        : [[], null];
      const data = settings?.data;
      maintenanceMode =
        !!data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        (data as Record<string, unknown>).maintenanceMode === true;
      redirectCache = new Map(
        rows.map((row) => [
          row.source,
          { target: row.target, status: row.status },
        ]),
      );
      redirectCacheExpiresAt = Date.now() + 5_000;
    } catch {
      redirectCache = new Map();
      maintenanceMode = false;
      redirectCacheExpiresAt = Date.now() + 1_000;
    }
  }

  if (maintenanceMode) {
    return new NextResponse(
      '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>We will be right back</title><body style="margin:0;background:#f7f4ed;color:#25231f;font-family:Arial,sans-serif;display:grid;min-height:100vh;place-items:center;text-align:center"><main><p style="letter-spacing:.16em;font-size:11px">TIRTHVAANI</p><h1 style="font-size:36px;font-weight:500">We will be right back.</h1><p>We are making a few improvements. Please return shortly.</p></main></body></html>',
      {
        status: 503,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Retry-After": "300",
        },
      },
    );
  }

  const entry = redirectCache.get(request.nextUrl.pathname);
  if (!entry) return NextResponse.next();

  let destination: URL;
  try {
    destination = new URL(entry.target, request.url);
    if (!["http:", "https:"].includes(destination.protocol)) {
      return NextResponse.next();
    }
  } catch {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    destination,
    entry.status === "FOUND" ? 302 : 301,
  );
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|admin|.*\\..*).*)"],
};
