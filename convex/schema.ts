import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  formSubmissions: defineTable({
    kind: v.union(v.literal("contact"), v.literal("work_with_us")),
    category: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    message: v.optional(v.string()),
    details: v.optional(v.record(v.string(), v.string())),
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("archived"),
    ),
    notificationStatus: v.optional(v.union(v.literal("pending"), v.literal("sent"), v.literal("failed"))),
    notificationError: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_kind_and_created_at", ["kind", "createdAt"])
    .index("by_status_and_created_at", ["status", "createdAt"]),

  cmsEntries: defineTable({
    type: v.string(),
    slug: v.string(),
    title: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    featuredImage: v.optional(v.string()),
    metadata: v.optional(v.any()),
    status: v.union(v.literal("draft"), v.literal("published")),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    updatedBy: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_type_and_status", ["type", "status"]),

  adminSessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  }).index("by_token", ["token"]),

  analyticsEvents: defineTable({
    path: v.string(),
    sessionId: v.string(),
    referrer: v.optional(v.string()),
    device: v.union(v.literal("mobile"), v.literal("tablet"), v.literal("desktop")),
    createdAt: v.number(),
  })
    .index("by_created_at", ["createdAt"])
    .index("by_path_and_created_at", ["path", "createdAt"]),

  siteSettings: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  cmsPages: defineTable({
    path: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    sections: v.array(v.any()),
    status: v.union(v.literal("draft"), v.literal("published")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_path", ["path"]),

  mediaAssets: defineTable({
    storageId: v.id("_storage"),
    name: v.string(),
    alt: v.string(),
    mimeType: v.string(),
    size: v.number(),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),
});
