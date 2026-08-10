import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/adminAuth";

export const trackPageView = mutation({
  args: {
    path: v.string(),
    sessionId: v.string(),
    referrer: v.optional(v.string()),
    device: v.union(v.literal("mobile"), v.literal("tablet"), v.literal("desktop")),
  },
  handler: async (ctx, args) => {
    const path = args.path.slice(0, 300);
    const sessionId = args.sessionId.slice(0, 100);
    if (!path.startsWith("/") || path.startsWith("/admin") || !sessionId) return null;
    return await ctx.db.insert("analyticsEvents", {
      path,
      sessionId,
      referrer: args.referrer?.slice(0, 500),
      device: args.device,
      createdAt: Date.now(),
    });
  },
});

export const overview = query({
  args: { sessionToken: v.string(), days: v.optional(v.number()) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const days = Math.min(Math.max(args.days ?? 30, 1), 365);
    const since = Date.now() - days * 86_400_000;
    const events = await ctx.db
      .query("analyticsEvents")
      .withIndex("by_created_at", (q) => q.gte("createdAt", since))
      .collect();

    const sessions = new Set(events.map((event) => event.sessionId));
    const pathCounts = new Map<string, number>();
    const deviceCounts = { mobile: 0, tablet: 0, desktop: 0 };
    const dailyCounts = new Map<string, number>();
    for (const event of events) {
      pathCounts.set(event.path, (pathCounts.get(event.path) ?? 0) + 1);
      deviceCounts[event.device] += 1;
      const day = new Date(event.createdAt).toISOString().slice(0, 10);
      dailyCounts.set(day, (dailyCounts.get(day) ?? 0) + 1);
    }

    return {
      views: events.length,
      visitors: sessions.size,
      pagesPerVisit: sessions.size ? Number((events.length / sessions.size).toFixed(1)) : 0,
      topPages: [...pathCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([path, views]) => ({ path, views })),
      devices: deviceCounts,
      daily: [...dailyCounts.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, views]) => ({ date, views })),
    };
  },
});
