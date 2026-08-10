import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/adminAuth";

export const getPublished = query({
  args: { path: v.string() },
  handler: async (ctx, args) => {
    const page = await ctx.db.query("cmsPages").withIndex("by_path", (q) => q.eq("path", args.path)).unique();
    return page?.status === "published" ? page : null;
  },
});

export const listAdmin = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    return await ctx.db.query("cmsPages").order("desc").collect();
  },
});

export const upsert = mutation({
  args: {
    sessionToken: v.string(),
    id: v.optional(v.id("cmsPages")),
    path: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    sections: v.array(v.any()),
    status: v.union(v.literal("draft"), v.literal("published")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const path = args.path.trim();
    if (!/^\/[a-z0-9\-/]*$/.test(path)) throw new ConvexError("Enter a valid site path beginning with /.");
    const existing = await ctx.db.query("cmsPages").withIndex("by_path", (q) => q.eq("path", path)).unique();
    if (existing && existing._id !== args.id) throw new ConvexError("That page path is already managed.");
    const now = Date.now();
    const values = { path, title: args.title.trim(), description: args.description?.trim(), sections: args.sections, status: args.status, updatedAt: now };
    if (!values.title) throw new ConvexError("Page title is required.");
    if (args.id) { await ctx.db.patch(args.id, values); return args.id; }
    return await ctx.db.insert("cmsPages", { ...values, createdAt: now });
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("cmsPages") },
  handler: async (ctx, args) => { await requireAdmin(ctx, args.sessionToken); await ctx.db.delete(args.id); },
});
