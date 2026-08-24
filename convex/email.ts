import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character] ?? character);
}

export const sendSubmissionNotification = internalAction({
  args: { submissionId: v.id("formSubmissions") },
  handler: async (ctx, args) => {
    const submission = await ctx.runQuery(internal.submissions.getForNotification, { id: args.submissionId });
    if (!submission) return;

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.FORM_NOTIFICATION_TO || "info@tait.tz";
    const cc = process.env.FORM_NOTIFICATION_CC || "kachilad@tait.tz";
    const from = process.env.FORM_NOTIFICATION_FROM || "TAIT Website <website@tait.tz>";
    if (!apiKey) {
      await ctx.runMutation(internal.submissions.setNotificationStatus, { id: args.submissionId, status: "failed", error: "RESEND_API_KEY is not configured." });
      return;
    }

    const kind = submission.kind === "contact" ? "Contact message" : "Work with TAIT application";
    const safe = {
      name: escapeHtml(submission.name),
      email: escapeHtml(submission.email),
      phone: escapeHtml(submission.phone || "Not provided"),
      category: escapeHtml(submission.category),
      message: escapeHtml(submission.message || "No message provided").replace(/\n/g, "<br />"),
    };
    const detailEntries = Object.entries(submission.details || {});
    const detailHtml = detailEntries.length
      ? `<div style="margin-top:24px"><h2 style="font-size:18px">Submission details</h2>${detailEntries.map(([label, value]) => `<p><strong>${escapeHtml(label.replace(/([A-Z])/g, " $1").replace(/^./, (character) => character.toUpperCase()))}:</strong> ${escapeHtml(value).replace(/\n/g, "<br />")}</p>`).join("")}</div>`
      : "";
    const detailText = detailEntries.length
      ? `\n\nSubmission details\n${detailEntries.map(([label, value]) => `${label}: ${value}`).join("\n")}`
      : "";

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `submission-${args.submissionId}`,
        },
        body: JSON.stringify({
          from,
          to: [to],
          cc: [cc],
          reply_to: submission.email,
          subject: `[TAIT Website] ${kind}: ${submission.category}`,
          html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#172033"><div style="background:#7f264a;color:white;padding:24px;border-radius:16px 16px 0 0"><div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.8">TAIT Website</div><h1 style="font-size:24px;margin:8px 0 0">${kind}</h1></div><div style="padding:24px;border:1px solid #e2e8f0;border-top:0;border-radius:0 0 16px 16px"><p><strong>Name:</strong> ${safe.name}</p><p><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p><p><strong>Phone:</strong> ${safe.phone}</p><p><strong>Category:</strong> ${safe.category}</p><div style="margin-top:24px;padding:18px;background:#f8fafc;border-radius:12px;line-height:1.6">${safe.message}</div>${detailHtml}<p style="margin-top:24px;color:#64748b;font-size:13px">Reply to this email to contact the sender directly. The submission is also saved in the TAIT admin inbox.</p></div></div>`,
          text: `${kind}\n\nName: ${submission.name}\nEmail: ${submission.email}\nPhone: ${submission.phone || "Not provided"}\nCategory: ${submission.category}\n\n${submission.message || "No message provided"}${detailText}`,
        }),
      });
      if (!response.ok) throw new Error(`Resend returned ${response.status}: ${(await response.text()).slice(0, 300)}`);
      await ctx.runMutation(internal.submissions.setNotificationStatus, { id: args.submissionId, status: "sent" });
    } catch (error) {
      await ctx.runMutation(internal.submissions.setNotificationStatus, { id: args.submissionId, status: "failed", error: error instanceof Error ? error.message : "Unknown email error" });
    }
  },
});
