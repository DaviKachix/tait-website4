import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/adminAuth";

const PUBLIC_KEYS = ["contact", "social", "announcement", "organization"];

export const getPublic = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("siteSettings").collect();
    return Object.fromEntries(
      settings.filter((setting) => PUBLIC_KEYS.includes(setting.key)).map((setting) => [setting.key, setting.value]),
    );
  },
});

export const listAdmin = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    return await ctx.db.query("siteSettings").collect();
  },
});

export const set = mutation({
  args: { sessionToken: v.string(), key: v.string(), value: v.any() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const key = args.key.trim().toLowerCase();
    const existing = await ctx.db
      .query("siteSettings")
      .withIndex("by_key", (q) => q.eq("key", key))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value, updatedAt: Date.now() });
      return existing._id;
    }
    return await ctx.db.insert("siteSettings", { key, value: args.value, updatedAt: Date.now() });
  },
});
