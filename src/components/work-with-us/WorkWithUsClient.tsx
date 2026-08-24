"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

type Path = "opportunity" | "partnership";
type FormState = {
  name: string; email: string; phone: string; opportunityType: string; location: string;
  experience: string; skills: string; availability: string; portfolioUrl: string; message: string;
  organization: string; role: string; websiteUrl: string; partnershipType: string;
  objectives: string; contribution: string; timeline: string;
};
const initialForm: FormState = { name: "", email: "", phone: "", opportunityType: "", location: "", experience: "", skills: "", availability: "", portfolioUrl: "", message: "", organization: "", role: "", websiteUrl: "", partnershipType: "", objectives: "", contribution: "", timeline: "" };
const inputClass = "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-slate-900 outline-none transition focus:border-[#7f264a] focus:ring-2 focus:ring-[#7f264a]/15";
const labelClass = "block text-sm font-semibold text-slate-800";

export default function WorkWithUsClient() {
  const [path, setPath] = useState<Path>("opportunity");
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<{ ok?: boolean; msg?: string } | null>(null);
  const [website, setWebsite] = useState("");
  const submitForm = useMutation(api.submissions.submit);
  const update = (field: keyof FormState, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async () => {
    const validIdentity = form.name.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email);
    const validOpportunity = form.opportunityType && form.skills.trim() && form.availability.trim() && form.message.trim();
    const validPartnership = form.organization.trim() && form.role.trim() && form.partnershipType && form.objectives.trim() && form.contribution.trim();
    if (!validIdentity || (path === "opportunity" ? !validOpportunity : !validPartnership)) {
      setStatus({ ok: false, msg: "Complete all required fields before submitting." }); return;
    }
    setStatus({ msg: "Submitting…" });
    try {
      await submitForm({
        kind: "work_with_us", category: path === "opportunity" ? form.opportunityType : "partnership",
        name: form.name, email: form.email, phone: form.phone,
        message: path === "opportunity" ? form.message : form.objectives, website,
        details: path === "opportunity" ? {
          opportunityType: form.opportunityType, location: form.location, experience: form.experience,
          skills: form.skills, availability: form.availability, portfolioUrl: form.portfolioUrl,
        } : {
          organization: form.organization, role: form.role, websiteUrl: form.websiteUrl,
          partnershipType: form.partnershipType, objectives: form.objectives,
          contribution: form.contribution, timeline: form.timeline,
        },
      });
      setStatus({ ok: true, msg: path === "partnership" ? "Your partnership proposal has been submitted for review." : "Your application has been submitted for review." });
      setForm(initialForm);
    } catch (error) {
      setStatus({ ok: false, msg: error instanceof Error ? error.message : "Submission failed. Please try again." });
    }
  };

  return (
    <div className="bg-slate-50 px-6 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#7f264a]">Work with TAIT</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Contribute your skills or build with us</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">Apply for an opportunity as an individual or propose an institutional partnership.</p>
        </header>
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-labelledby="work-form-title">
          <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="How you want to work with TAIT">
            <button type="button" aria-pressed={path === "opportunity"} onClick={() => { setPath("opportunity"); setStatus(null); }} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[#7f264a]/20 ${path === "opportunity" ? "border-[#7f264a] bg-[#7f264a]/5 text-[#7f264a] shadow-sm" : "border-slate-200 text-slate-700 hover:border-[#7f264a]/40"}`}><span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7f264a]/10"><i className="fa-solid fa-user-tie" aria-hidden="true" /></span><span><span className="block font-bold">Individual opportunity</span><span className="mt-1 block text-sm font-normal">Career, internship, or volunteering</span></span></button>
            <button type="button" aria-pressed={path === "partnership"} onClick={() => { setPath("partnership"); setStatus(null); }} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[#7f264a]/20 ${path === "partnership" ? "border-[#7f264a] bg-[#7f264a]/5 text-[#7f264a] shadow-sm" : "border-slate-200 text-slate-700 hover:border-[#7f264a]/40"}`}><span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7f264a]/10"><i className="fa-solid fa-handshake" aria-hidden="true" /></span><span><span className="block font-bold">Institutional partnership</span><span className="mt-1 block text-sm font-normal">Collaborate as an organization</span></span></button>
          </div>
          <form onSubmit={(event) => { event.preventDefault(); void submit(); }} className="mt-8 space-y-5">
            <h2 id="work-form-title" className="flex items-center gap-3 text-2xl font-bold text-slate-950"><span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#7f264a]/10 text-[#7f264a]"><i className={`fa-solid ${path === "opportunity" ? "fa-file-signature" : "fa-people-group"}`} aria-hidden="true" /></span>{path === "opportunity" ? "Opportunity application" : "Partnership proposal"}</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>Full name *<input className={inputClass} value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" required maxLength={120} /></label>
              <label className={labelClass}>Email address *<input className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} type="email" autoComplete="email" required maxLength={254} /></label>
              <label className={labelClass}>Phone number<input className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} type="tel" autoComplete="tel" maxLength={40} /></label>
              {path === "opportunity" ? <label className={labelClass}>Opportunity *<select className={inputClass} value={form.opportunityType} onChange={(e) => update("opportunityType", e.target.value)} required><option value="">Select an option</option><option>Career</option><option>Internship</option><option>Volunteering</option></select></label> : <label className={labelClass}>Your role *<input className={inputClass} value={form.role} onChange={(e) => update("role", e.target.value)} required maxLength={120} /></label>}
            </div>
            {path === "opportunity" ? <>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>Current location<input className={inputClass} value={form.location} onChange={(e) => update("location", e.target.value)} autoComplete="address-level2" maxLength={120} /></label>
                <label className={labelClass}>Relevant experience<select className={inputClass} value={form.experience} onChange={(e) => update("experience", e.target.value)}><option value="">Select experience</option><option>Student / no professional experience</option><option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5+ years</option></select></label>
              </div>
              <label className={labelClass}>Relevant skills *<textarea className={inputClass} rows={3} value={form.skills} onChange={(e) => update("skills", e.target.value)} required maxLength={2000} /></label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>Availability *<input className={inputClass} value={form.availability} onChange={(e) => update("availability", e.target.value)} placeholder="Start date and hours per week" required maxLength={200} /></label>
                <label className={labelClass}>CV, LinkedIn, or portfolio URL<input className={inputClass} type="url" value={form.portfolioUrl} onChange={(e) => update("portfolioUrl", e.target.value)} placeholder="https://" maxLength={1000} /></label>
              </div>
              <label className={labelClass}>Why do you want to work with TAIT? *<textarea className={inputClass} rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} required maxLength={4000} /></label>
            </> : <>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>Organization *<input className={inputClass} value={form.organization} onChange={(e) => update("organization", e.target.value)} autoComplete="organization" required maxLength={160} /></label>
                <label className={labelClass}>Organization website<input className={inputClass} type="url" value={form.websiteUrl} onChange={(e) => update("websiteUrl", e.target.value)} placeholder="https://" maxLength={1000} /></label>
                <label className={labelClass}>Partnership area *<select className={inputClass} value={form.partnershipType} onChange={(e) => update("partnershipType", e.target.value)} required><option value="">Select partnership area</option><option>Technology and systems</option><option>Media and evangelism</option><option>Research</option><option>Training and capacity building</option><option>Funding or sponsorship</option><option>Programme delivery</option><option>Other</option></select></label>
                <label className={labelClass}>Proposed timeframe<input className={inputClass} value={form.timeline} onChange={(e) => update("timeline", e.target.value)} placeholder="Expected start and duration" maxLength={200} /></label>
              </div>
              <label className={labelClass}>Partnership objectives *<textarea className={inputClass} rows={5} value={form.objectives} onChange={(e) => update("objectives", e.target.value)} required maxLength={4000} /></label>
              <label className={labelClass}>What will each organization contribute? *<textarea className={inputClass} rows={4} value={form.contribution} onChange={(e) => update("contribution", e.target.value)} required maxLength={4000} /></label>
            </>}
            <input name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {status?.msg && <p role={status.ok === false ? "alert" : "status"} aria-live="polite" className={`rounded-xl px-4 py-3 text-sm ${status.ok ? "bg-emerald-50 text-emerald-800" : status.ok === false ? "bg-rose-50 text-rose-800" : "bg-slate-100 text-slate-700"}`}>{status.msg}</p>}
            <button type="submit" disabled={status?.msg === "Submitting…"} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7f264a] px-5 py-3.5 font-bold text-white shadow-sm transition hover:bg-[#69203e] disabled:cursor-not-allowed disabled:opacity-60"><i className={`fa-solid ${status?.msg === "Submitting…" ? "fa-circle-notch fa-spin" : "fa-paper-plane"}`} aria-hidden="true" />{path === "partnership" ? "Submit partnership proposal" : "Submit application"}</button>
            <p className="text-xs leading-5 text-slate-500">By submitting, you authorize TAIT to review and use this information for recruitment or partnership assessment.</p>
          </form>
        </section>
      </div>
    </div>
  );
}
