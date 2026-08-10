"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const options = ["Careers", "Internships", "Volunteering", "Partnership"] as const;

export default function WorkWithUsClient() {
  const [mode, setMode] = useState<typeof options[number]>(options[0]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<{ ok?: boolean; msg?: string } | null>(null);
  const [website, setWebsite] = useState("");
  const submitForm = useMutation(api.submissions.submit);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async () => {
    if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setStatus({ ok: false, msg: "Please provide a valid name and email." });
      return;
    }

    setStatus({ msg: "Sending…" });
    try {
      await submitForm({
        kind: "work_with_us",
        category: mode,
        ...form,
        website,
      });
      setStatus({ ok: true, msg: "Thanks — we’ll be in touch soon." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus({ ok: false, msg: error instanceof Error ? error.message : "Unable to send your application. Try again later." });
    }
  };

  return (
    <main className="min-h-screen bg-white px-6 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Work with TAIT</h1>
            <p className="mt-3 text-base text-slate-600">Short form — tell us who you are and what you would like to do.</p>

            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              <li>• Careers: contribute full-time to church technology.</li>
              <li>• Internships: learn on real projects.</li>
              <li>• Volunteering: donate time and expertise.</li>
              <li>• Partnership: institutional collaboration.</li>
            </ul>

            <p className="mt-6 text-sm text-slate-500">We try to reply within 48 hours. If urgent, email info@tait.tz.</p>
          </div>

          <div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Applying for</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">{mode}</div>
                </div>
                <div className="text-sm text-slate-500">Simple form</div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {options.map((o) => (
                  <button key={o} onClick={() => setMode(o)} className={`px-3 py-1 rounded-full text-sm ${mode===o ? 'bg-[#7f264a] text-white' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}>
                    {o}
                  </button>
                ))}
              </div>

              <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="mt-5 space-y-3">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" autoComplete="name" required maxLength={120} className="w-full rounded-md border px-3 py-2" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" autoComplete="email" required maxLength={254} className="w-full rounded-md border px-3 py-2" />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (optional)" type="tel" autoComplete="tel" maxLength={40} className="w-full rounded-md border px-3 py-2" />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="One-line note (optional)" className="w-full rounded-md border px-3 py-2" rows={3} />
                <input name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                {status?.msg && <div role="status" aria-live="polite" className={`text-sm ${status.ok ? 'text-emerald-700' : 'text-rose-700'}`}>{status.msg}</div>}

                <div className="mt-4 flex items-center gap-3">
                  <button type="submit" disabled={status?.msg === "Sending…"} className="rounded-md bg-[#7f264a] px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60">Send</button>
                  <a href="mailto:info@tait.tz" className="text-sm text-slate-600">Email instead</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
