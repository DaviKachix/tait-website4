import { NextRequest, NextResponse } from "next/server";

const previewTargets: Record<string, string> = {
  pakia: "https://pakia.tz",
  ntuc: "https://events.ntucadventist.org",
  taawa: "https://taawa.or.tz",
};

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const site = url.searchParams.get("site");

  if (!site || !previewTargets[site]) {
    return NextResponse.json({ error: "Invalid preview key" }, { status: 400 });
  }

  const targetUrl = previewTargets[site];
  const screenshotUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=1200`;
  const response = await fetch(screenshotUrl);

  if (!response.ok) {
    return NextResponse.json(
      { error: "Unable to load preview image" },
      { status: response.status }
    );
  }

  const contentType = response.headers.get("content-type") || "image/png";
  const body = await response.arrayBuffer();

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
