"use client";

import { useState } from "react";

const requestOptions = [
  { key: "assistance", label: "Help / Support", icon: "fa-circle-question" },
  { key: "project", label: "Project Inquiry", icon: "fa-code" },
  { key: "message", label: "General Message", icon: "fa-envelope" },
];

export default function ContactClient() {
  const [mode, setMode] = useState<"assistance" | "project" | "message">("assistance");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<{ ok?: boolean; msg?: string } | null>(null);

  const email = "info@tait.tz";
  const whatsapp = "255620517139";

  const openWhatsApp = (text: string) => window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  const sendEmail = (subject: string, body: string) => (window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);

  const handleChange = (field: keyof typeof form, value: string) => setForm((c) => ({ ...c, [field]: value }));

  const submit = () => {
    if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || !form.message.trim()) {
      setStatus({ ok: false, msg: 'Please provide name, valid email and a short message.' });
      return;
    }

    setStatus({ ok: true, msg: 'Opening email client — you can edit and send.' });
    const subject = `TAIT ${mode.toUpperCase()} REQUEST`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`;
    sendEmail(subject, body);
  };

  const messagePlaceholder = mode === 'project' ? 'Project summary, goals and timeline.' : mode === 'assistance' ? 'Support needed (brief).' : 'Write your message.';

  return (
    <main className="min-h-screen bg-white px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Contact</h1>
            <p className="mt-3 text-base text-slate-600">Quick message or project inquiry. Pick a type, write a short note, and choose how to send.</p>

            <div className="mt-6 space-y-4 text-sm text-slate-700">
              <div>
                <div className="text-xs text-slate-500">Phone</div>
                <div className="mt-1 font-medium">+255 620 517 139</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Email</div>
                <div className="mt-1 font-medium">info@tait.tz</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Response</div>
                <div className="mt-1 font-medium">Typically within 24–48 hours</div>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Type</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">{mode === 'assistance' ? 'Help' : mode === 'project' ? 'Project' : 'Message'}</div>
                </div>
                <div className="text-sm text-slate-500">Fast send</div>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={() => setMode('assistance')} className={`px-3 py-1 rounded-full text-sm ${mode==='assistance' ? 'bg-[#7f264a] text-white' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}>Help</button>
                <button onClick={() => setMode('project')} className={`px-3 py-1 rounded-full text-sm ${mode==='project' ? 'bg-[#7f264a] text-white' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}>Project</button>
                <button onClick={() => setMode('message')} className={`px-3 py-1 rounded-full text-sm ${mode==='message' ? 'bg-[#7f264a] text-white' : 'bg-slate-50 text-slate-700 border border-slate-200'}`}>Message</button>
              </div>

              <div className="mt-5 space-y-3">
                <input aria-label="Name" value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your name" className="w-full rounded-md border px-3 py-2" />
                <input aria-label="Email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2" />
                <textarea aria-label="Message" value={form.message} onChange={(e) => handleChange('message', e.target.value)} placeholder={messagePlaceholder} className="w-full rounded-md border px-3 py-2" rows={4} />

                {status?.msg && <div className={`text-sm ${status.ok ? 'text-emerald-700' : 'text-rose-700'}`}>{status.msg}</div>}

                <div className="mt-4 flex gap-3">
                  <button onClick={submit} className="rounded-md bg-[#7f264a] px-4 py-2 text-white">Send</button>
                  <button onClick={() => openWhatsApp(form.message || messagePlaceholder)} className="rounded-md bg-emerald-600 px-4 py-2 text-white">WhatsApp</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
