"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const track = useMutation(api.analytics.trackPageView);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const key = "tait_analytics_session";
    let sessionId = sessionStorage.getItem(key);
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem(key, sessionId);
    }
    const width = window.innerWidth;
    const device = width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop";
    void track({
      path: pathname,
      sessionId,
      device,
      ...(document.referrer ? { referrer: document.referrer } : {}),
    });
  }, [pathname, track]);

  return null;
}
