import { ConvexError } from "convex/values";
import type { QueryCtx, MutationCtx } from "../_generated/server";

export async function requireAdmin(ctx: QueryCtx | MutationCtx, token: string) {
  const session = await ctx.db
    .query("adminSessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .unique();

  if (!session || session.expiresAt <= Date.now()) {
    throw new ConvexError("Your admin session is invalid or has expired.");
  }
  return session;
}
