"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState } from "react";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";

export default function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL is not configured.");

  const [client] = useState(() => new ConvexReactClient(url));
  return (
    <ConvexProvider client={client}>
      <AnalyticsTracker />
      {children}
    </ConvexProvider>
  );
}
