import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/adminAuth";

export const generateUploadUrl = mutation({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => { await requireAdmin(ctx, args.sessionToken); return await ctx.storage.generateUploadUrl(); },
});

export const save = mutation({
  args: { sessionToken: v.string(), storageId: v.id("_storage"), name: v.string(), alt: v.string(), mimeType: v.string(), size: v.number() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    return await ctx.db.insert("mediaAssets", { storageId: args.storageId, name: args.name.slice(0, 200), alt: args.alt.slice(0, 300), mimeType: args.mimeType, size: args.size, createdAt: Date.now() });
  },
});

export const list = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const assets = await ctx.db.query("mediaAssets").withIndex("by_created_at").order("desc").collect();
    return await Promise.all(assets.map(async (asset) => ({ ...asset, url: await ctx.storage.getUrl(asset.storageId) })));
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("mediaAssets") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const asset = await ctx.db.get(args.id);
    if (asset) { await ctx.storage.delete(asset.storageId); await ctx.db.delete(args.id); }
  },
});
