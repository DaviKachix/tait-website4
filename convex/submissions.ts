import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/adminAuth";
import { internal } from "./_generated/api";

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
    details: v.optional(v.record(v.string(), v.string())),
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
    const details = args.details
      ? Object.fromEntries(
          Object.entries(args.details)
            .map(([key, value]) => [key, clean(value, key, 4_000)] as const)
            .filter(([, value]) => value),
        )
      : undefined;

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

    const submissionId = await ctx.db.insert("formSubmissions", {
      kind: args.kind,
      category,
      name,
      email,
      ...(phone ? { phone } : {}),
      ...(message ? { message } : {}),
      ...(details && Object.keys(details).length ? { details } : {}),
      status: "new",
      notificationStatus: "pending",
      createdAt: now,
      updatedAt: now,
    });
    await ctx.scheduler.runAfter(0, internal.email.sendSubmissionNotification, { submissionId });
    return submissionId;
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

export const getForNotification = internalQuery({
  args: { id: v.id("formSubmissions") },
  handler: async (ctx, args) => await ctx.db.get(args.id),
});

export const setNotificationStatus = internalMutation({
  args: {
    id: v.id("formSubmissions"),
    status: v.union(v.literal("sent"), v.literal("failed")),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      notificationStatus: args.status,
      notificationError: args.error?.slice(0, 500),
      updatedAt: Date.now(),
    });
  },
});
