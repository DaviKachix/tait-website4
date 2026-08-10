import { ConvexError, v } from "convex/values";
import { action, internalMutation, mutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { requireAdmin } from "./lib/adminAuth";

const SESSION_DURATION_MS = 12 * 60 * 60 * 1_000;

export const login = action({
  args: { password: v.string() },
  handler: async (ctx, args): Promise<{ token: string; expiresAt: number }> => {
    const password = process.env.CMS_ADMIN_PASSWORD;
    if (!password || args.password !== password) {
      throw new ConvexError("Invalid administrator credentials.");
    }

    const token = crypto.randomUUID();
    const expiresAt = Date.now() + SESSION_DURATION_MS;
    await ctx.runMutation(internal.adminAuth.createSession, { token, expiresAt });
    return { token, expiresAt };
  },
});

export const createSession = internalMutation({
  args: { token: v.string(), expiresAt: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.insert("adminSessions", {
      token: args.token,
      expiresAt: args.expiresAt,
      createdAt: Date.now(),
    });
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await requireAdmin(ctx, args.token);
    await ctx.db.delete(session._id);
  },
});
