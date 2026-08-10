import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/adminAuth";

export const getPublished = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("cmsEntries")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return entry?.status === "published" ? entry : null;
  },
});

export const listPublished = query({
  args: { type: v.string() },
  handler: async (ctx, args) =>
    await ctx.db
      .query("cmsEntries")
      .withIndex("by_type_and_status", (q) => q.eq("type", args.type).eq("status", "published"))
      .collect(),
});

export const listAdmin = query({
  args: { sessionToken: v.string(), type: v.optional(v.string()) },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const entries = await ctx.db.query("cmsEntries").order("desc").collect();
    return args.type ? entries.filter((entry) => entry.type === args.type) : entries;
  },
});

export const upsert = mutation({
  args: {
    sessionToken: v.string(),
    id: v.optional(v.id("cmsEntries")),
    type: v.string(),
    slug: v.string(),
    title: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    featuredImage: v.optional(v.string()),
    metadata: v.optional(v.any()),
    status: v.union(v.literal("draft"), v.literal("published")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const slug = args.slug.trim().toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      throw new ConvexError("Slug may contain lowercase letters, numbers, and hyphens only.");
    }
    const existing = await ctx.db
      .query("cmsEntries")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing && existing._id !== args.id) throw new ConvexError("That slug is already in use.");

    const now = Date.now();
    const values = {
      type: args.type.trim(),
      slug,
      title: args.title.trim(),
      excerpt: args.excerpt?.trim() || undefined,
      content: args.content,
      featuredImage: args.featuredImage?.trim() || undefined,
      metadata: args.metadata,
      status: args.status,
      publishedAt: args.status === "published" ? (existing?.publishedAt ?? now) : undefined,
      updatedAt: now,
      updatedBy: "admin",
    };
    if (!values.type || !values.title) throw new ConvexError("Type and title are required.");

    if (args.id) {
      await ctx.db.patch(args.id, values);
      return args.id;
    }
    return await ctx.db.insert("cmsEntries", { ...values, createdAt: now });
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("cmsEntries") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    await ctx.db.delete(args.id);
  },
});
