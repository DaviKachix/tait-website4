import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/adminAuth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DUPLICATE_WINDOW_MS = 60_000;

function clean(value: string, field: string, maxLength: number) {
  const result = value.trim();
  if (result.length > maxLength) {
    throw new ConvexError(`${field} must be ${maxLength} characters or fewer.`);
  }
  return result;
}

export const submit = mutation({
  args: {
    kind: v.union(v.literal("contact"), v.literal("work_with_us")),
    category: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // This field is hidden from people. Bots commonly fill it in.
    if (args.website?.trim()) return null;

    const name = clean(args.name, "Name", 120);
    const email = clean(args.email, "Email", 254).toLowerCase();
    const phone = args.phone ? clean(args.phone, "Phone", 40) : undefined;
    const message = args.message ? clean(args.message, "Message", 4_000) : undefined;
    const category = clean(args.category, "Category", 60).toLowerCase();

    if (name.length < 2) throw new ConvexError("Please enter your full name.");
    if (!EMAIL_PATTERN.test(email)) throw new ConvexError("Please enter a valid email address.");
    if (!category) throw new ConvexError("Please choose a category.");
    if (args.kind === "contact" && !message) throw new ConvexError("Please enter a message.");

    const latest = await ctx.db
      .query("formSubmissions")
      .withIndex("by_email", (q) => q.eq("email", email))
      .order("desc")
      .first();
    const now = Date.now();
    if (latest && now - latest.createdAt < DUPLICATE_WINDOW_MS) {
      throw new ConvexError("Please wait a minute before sending another message.");
    }

    return await ctx.db.insert("formSubmissions", {
      kind: args.kind,
      category,
      name,
      email,
      ...(phone ? { phone } : {}),
      ...(message ? { message } : {}),
      status: "new",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const list = query({
  args: {
    sessionToken: v.string(),
    status: v.optional(v.union(v.literal("new"), v.literal("in_progress"), v.literal("resolved"), v.literal("archived"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    const limit = Math.min(Math.max(args.limit ?? 50, 1), 100);
    if (args.status) {
      return await ctx.db
        .query("formSubmissions")
        .withIndex("by_status_and_created_at", (q) => q.eq("status", args.status!))
        .order("desc")
        .take(limit);
    }
    return await ctx.db.query("formSubmissions").order("desc").take(limit);
  },
});

export const updateStatus = mutation({
  args: {
    sessionToken: v.string(),
    id: v.id("formSubmissions"),
    status: v.union(v.literal("new"), v.literal("in_progress"), v.literal("resolved"), v.literal("archived")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    await ctx.db.patch(args.id, { status: args.status, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { sessionToken: v.string(), id: v.id("formSubmissions") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.sessionToken);
    await ctx.db.delete(args.id);
  },
});
