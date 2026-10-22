import { NextRequest } from "next/server";

const ORIGIN = "https://sfstartuplabs.com";

/** Same-origin image proxy so WebGL can use the photos as textures (the source host sends no CORS headers). */
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams.get("p") ?? "";
  if (!/^\/(program-photos|mentors|founder)\/[\w.-]+$/.test(p)) return new Response("Bad path", { status: 400 });
  const r = await fetch(ORIGIN + p);
  if (!r.ok || !r.body) return new Response("Not found", { status: 404 });
  return new Response(r.body, {
    headers: {
      "content-type": r.headers.get("content-type") ?? "image/jpeg",
      "cache-control": "public, max-age=86400, s-maxage=604800",
    },
  });
}
