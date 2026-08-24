"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

type ContactMode = "assistance" | "project" | "message";
type FormState = {
  name: string; email: string; phone: string; organization: string; projectTitle: string;
  projectType: string; goals: string; audience: string; scope: string; budget: string;
  timeline: string; launchDate: string; existingAssets: string; referenceLinks: string; message: string;
};

const initialForm: FormState = {
  name: "", email: "", phone: "", organization: "", projectTitle: "", projectType: "",
  goals: "", audience: "", scope: "", budget: "", timeline: "", launchDate: "",
  existingAssets: "", referenceLinks: "", message: "",
};
const inputClass = "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#7f264a] focus:ring-2 focus:ring-[#7f264a]/15";
const labelClass = "block text-sm font-semibold text-slate-800";
const selectorClass = "group flex min-h-20 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#7f264a]/20";

export default function ContactClient() {
  const [mode, setMode] = useState<ContactMode>("assistance");
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<{ ok?: boolean; msg?: string } | null>(null);
  const [website, setWebsite] = useState("");
  const submitForm = useMutation(api.submissions.submit);
  const settings = useQuery(api.settings.getPublic);
  const contact = settings?.contact as { whatsapp?: string; email?: string } | undefined;
  const email = contact?.email || "info@tait.tz";
  const phone = contact?.whatsapp || "+255620517139";
  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async () => {
    if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setStatus({ ok: false, msg: "Enter your name and a valid email address." }); return;
    }
    if (mode === "project" && (!form.projectTitle.trim() || !form.projectType || !form.goals.trim() || !form.scope.trim() || !form.budget || !form.timeline)) {
      setStatus({ ok: false, msg: "Complete all required project fields before submitting." }); return;
    }
    if (mode !== "project" && !form.message.trim()) {
      setStatus({ ok: false, msg: "Tell us how we can help." }); return;
    }
    setStatus({ msg: "Submitting…" });
    try {
      await submitForm({
        kind: "contact", category: mode, name: form.name, email: form.email, phone: form.phone,
        message: mode === "project" ? form.goals : form.message, website,
        details: mode === "project" ? {
          organization: form.organization, projectTitle: form.projectTitle, projectType: form.projectType,
          goals: form.goals, audience: form.audience, scope: form.scope, budget: form.budget,
          timeline: form.timeline, launchDate: form.launchDate, existingAssets: form.existingAssets,
          referenceLinks: form.referenceLinks,
        } : undefined,
      });
      setStatus({ ok: true, msg: mode === "project" ? "Your project brief has been submitted. Our team will review it and contact you." : "Your message has been submitted. Our team will contact you." });
      setForm(initialForm);
    } catch (error) {
      setStatus({ ok: false, msg: error instanceof Error ? error.message : "Submission failed. Please try again." });
    }
  };

  return (
    <div className="bg-slate-50 px-6 py-14 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7f264a]">Contact TAIT</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Start the right conversation</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">Request support, send a message, or give our team the information needed to evaluate your project.</p>
        </header>
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <aside className="rounded-2xl bg-[#7f264a] p-7 text-white">
            <h2 className="flex items-center gap-3 text-xl font-bold"><i className="fa-solid fa-address-card" aria-hidden="true" /> Contact details</h2>
            <dl className="mt-6 space-y-5">
              <div className="flex gap-3"><i className="fa-brands fa-whatsapp mt-1 text-lg" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wider text-white/65">Phone & WhatsApp</dt><dd className="mt-1"><a className="font-semibold hover:underline" href={`tel:${phone}`}>{phone}</a></dd></div></div>
              <div className="flex gap-3"><i className="fa-solid fa-envelope mt-1" aria-hidden="true" /><div><dt className="text-xs font-semibold uppercase tracking-wider text-white/65">Email</dt><dd className="mt-1"><a className="font-semibold hover:underline" href={`mailto:${email}`}>{email}</a></dd></div></div>
            </dl>
          </aside>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" className="flex items-center gap-3 text-2xl font-bold text-slate-950"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#7f264a]/10 text-[#7f264a]"><i className="fa-solid fa-comment-dots" aria-hidden="true" /></span> What can we help you with?</h2>
            <div className="mt-5 grid gap-2 sm:grid-cols-3" role="group" aria-label="Contact request type">
              {([['assistance', 'Request support', 'fa-headset'], ['project', 'Submit a project', 'fa-diagram-project'], ['message', 'General message', 'fa-envelope']] as const).map(([value, label, icon]) => (
                <button key={value} type="button" aria-pressed={mode === value} onClick={() => { setMode(value); setStatus(null); }} className={`${selectorClass} ${mode === value ? "border-[#7f264a] bg-[#7f264a] text-white shadow-sm" : "border-slate-200 text-slate-700 hover:border-[#7f264a]/50 hover:bg-slate-50"}`}><i className={`fa-solid ${icon} text-lg ${mode === value ? "text-white" : "text-[#7f264a]"}`} aria-hidden="true" /><span>{label}</span></button>
              ))}
            </div>
            <form onSubmit={(event) => { event.preventDefault(); void submit(); }} className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>Full name *<input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" required maxLength={120} /></label>
                <label className={labelClass}>Email address *<input className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} type="email" autoComplete="email" required maxLength={254} /></label>
                <label className={labelClass}>Phone number<input className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} type="tel" autoComplete="tel" maxLength={40} /></label>
                {mode === "project" && <label className={labelClass}>Organization<input className={inputClass} value={form.organization} onChange={(e) => update("organization", e.target.value)} autoComplete="organization" maxLength={160} /></label>}
              </div>
              {mode === "project" ? <>
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3 pt-1 text-sm font-bold uppercase tracking-wider text-[#7f264a]"><i className="fa-solid fa-clipboard-list" aria-hidden="true" /> Project overview</div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>Project name *<input className={inputClass} value={form.projectTitle} onChange={(e) => update("projectTitle", e.target.value)} required maxLength={160} /></label>
                  <label className={labelClass}>Project type *<select className={inputClass} value={form.projectType} onChange={(e) => update("projectType", e.target.value)} required><option value="">Select project type</option><option>Website or web application</option><option>Church management system</option><option>Mobile application</option><option>Media production</option><option>Research or data project</option><option>Training programme</option><option>Technology consulting</option><option>Other</option></select></label>
                </div>
                <label className={labelClass}>Goals and desired outcomes *<textarea className={inputClass} rows={3} value={form.goals} onChange={(e) => update("goals", e.target.value)} required maxLength={4000} /></label>
                <label className={labelClass}>Target users or audience<textarea className={inputClass} rows={3} value={form.audience} onChange={(e) => update("audience", e.target.value)} maxLength={2000} /></label>
                <label className={labelClass}>Required features and deliverables *<textarea className={inputClass} rows={3} value={form.scope} onChange={(e) => update("scope", e.target.value)} required maxLength={4000} /></label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className={labelClass}>Estimated budget *<select className={inputClass} value={form.budget} onChange={(e) => update("budget", e.target.value)} required><option value="">Select budget range</option><option>Under TZS 2 million</option><option>TZS 2–5 million</option><option>TZS 5–15 million</option><option>TZS 15–50 million</option><option>Above TZS 50 million</option><option>Grant or donor funded</option><option>Not yet determined</option></select></label>
                  <label className={labelClass}>Delivery timeframe *<select className={inputClass} value={form.timeline} onChange={(e) => update("timeline", e.target.value)} required><option value="">Select timeframe</option><option>Less than 1 month</option><option>1–3 months</option><option>3–6 months</option><option>6–12 months</option><option>More than 12 months</option><option>To be discussed</option></select></label>
                  <label className={labelClass}>Preferred launch date<input className={inputClass} type="date" value={form.launchDate} onChange={(e) => update("launchDate", e.target.value)} /></label>
                  <label className={labelClass}>Reference links<input className={inputClass} value={form.referenceLinks} onChange={(e) => update("referenceLinks", e.target.value)} placeholder="Existing site, documents, or examples" maxLength={1000} /></label>
                </div>
                <label className={labelClass}>Existing assets, systems, or constraints<textarea className={inputClass} rows={3} value={form.existingAssets} onChange={(e) => update("existingAssets", e.target.value)} maxLength={2000} /></label>
              </> : <label className={labelClass}>{mode === "assistance" ? "Describe the support you need" : "Your message"} *<textarea className={inputClass} rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} required maxLength={4000} /></label>}
              <input name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              {status?.msg && <p role={status.ok === false ? "alert" : "status"} aria-live="polite" className={`rounded-xl px-4 py-3 text-sm ${status.ok ? "bg-emerald-50 text-emerald-800" : status.ok === false ? "bg-rose-50 text-rose-800" : "bg-slate-100 text-slate-700"}`}>{status.msg}</p>}
              <button type="submit" disabled={status?.msg === "Submitting…"} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7f264a] px-5 py-3.5 font-bold text-white shadow-sm transition hover:bg-[#69203e] disabled:cursor-not-allowed disabled:opacity-60"><i className={`fa-solid ${status?.msg === "Submitting…" ? "fa-circle-notch fa-spin" : "fa-paper-plane"}`} aria-hidden="true" />{mode === "project" ? "Submit project brief" : "Submit message"}</button>
              <p className="text-xs leading-5 text-slate-500">By submitting, you authorize TAIT to use these details to assess and respond to your request.</p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
