"use client";

import { useEffect, useMemo, useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import PageManager from "./PageManager";
import MediaLibrary from "./MediaLibrary";

type Section = "overview" | "inbox" | "pages" | "content" | "media" | "settings";
type EntryStatus = "draft" | "published";
type SubmissionStatus = "new" | "in_progress" | "resolved" | "archived";

const EMPTY_ENTRY = {
  id: undefined as Id<"cmsEntries"> | undefined,
  type: "article",
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  status: "draft" as EntryStatus,
};

function Metric({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{note}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [section, setSection] = useState<Section>("overview");
  const [days, setDays] = useState(30);
  const [entry, setEntry] = useState(EMPTY_ENTRY);
  const [settingKey, setSettingKey] = useState("announcement");
  const [settingValue, setSettingValue] = useState("{\n  \"enabled\": false,\n  \"message\": \"\"\n}");
  const [notice, setNotice] = useState("");

  const login = useAction(api.adminAuth.login);
  const logout = useMutation(api.adminAuth.logout);
  const updateSubmission = useMutation(api.submissions.updateStatus);
  const removeSubmission = useMutation(api.submissions.remove);
  const saveEntry = useMutation(api.cms.upsert);
  const removeEntry = useMutation(api.cms.remove);
  const saveSetting = useMutation(api.settings.set);

  useEffect(() => {
    const saved = localStorage.getItem("tait_admin_session");
    if (saved) setToken(saved);
  }, []);

  const analytics = useQuery(api.analytics.overview, token ? { sessionToken: token, days } : "skip");
  const submissions = useQuery(api.submissions.list, token ? { sessionToken: token, limit: 100 } : "skip");
  const entries = useQuery(api.cms.listAdmin, token ? { sessionToken: token } : "skip");
  const settings = useQuery(api.settings.listAdmin, token ? { sessionToken: token } : "skip");

  const maxDaily = useMemo(() => Math.max(...(analytics?.daily.map((item) => item.views) ?? [1]), 1), [analytics]);
  const newCount = submissions?.filter((item) => item.status === "new").length ?? 0;

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const session = await login({ password });
      localStorage.setItem("tait_admin_session", session.token);
      setToken(session.token);
      setPassword("");
    } catch {
      setLoginError("Invalid password or the admin service is unavailable.");
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    if (token) await logout({ token }).catch(() => undefined);
    localStorage.removeItem("tait_admin_session");
    setToken(null);
  }

  async function handleSaveEntry(event: React.FormEvent) {
    event.preventDefault();
    if (!token) return;
    setNotice("Saving…");
    try {
      await saveEntry({
        sessionToken: token,
        ...(entry.id ? { id: entry.id } : {}),
        type: entry.type,
        slug: entry.slug,
        title: entry.title,
        excerpt: entry.excerpt || undefined,
        content: entry.content,
        featuredImage: entry.featuredImage || undefined,
        status: entry.status,
      });
      setEntry(EMPTY_ENTRY);
      setNotice("Content saved successfully.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to save content.");
    }
  }

  async function handleSaveSetting(event: React.FormEvent) {
    event.preventDefault();
    if (!token) return;
    try {
      const value: unknown = JSON.parse(settingValue);
      await saveSetting({ sessionToken: token, key: settingKey, value });
      setNotice("Setting saved successfully.");
    } catch (error) {
      setNotice(error instanceof SyntaxError ? "Setting value must be valid JSON." : "Unable to save setting.");
    }
  }

  if (!token) {
    return (
      <div className="fixed inset-0 z-[100] grid min-h-screen place-items-center bg-slate-950 px-5">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7f264a] text-xl font-bold text-white">T</div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7f264a]">TAIT Operations</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">Admin sign in</h1>
          <p className="mt-2 text-sm text-slate-500">Manage website content, messages, settings, and performance.</p>
          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <label className="block text-sm font-medium text-slate-700">
              Administrator password
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoFocus autoComplete="current-password" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#7f264a] focus:ring-2 focus:ring-[#7f264a]/15" />
            </label>
            {loginError && <p role="alert" className="text-sm text-rose-700">{loginError}</p>}
            <button disabled={loggingIn} className="w-full rounded-xl bg-[#7f264a] px-4 py-3 font-semibold text-white disabled:opacity-60">{loggingIn ? "Signing in…" : "Sign in"}</button>
          </form>
        </div>
      </div>
    );
  }

  const nav: Array<{ key: Section; label: string; icon: string }> = [
    { key: "overview", label: "Overview", icon: "fa-chart-line" },
    { key: "inbox", label: `Inbox${newCount ? ` (${newCount})` : ""}`, icon: "fa-inbox" },
    { key: "pages", label: "Pages", icon: "fa-layer-group" },
    { key: "content", label: "Content", icon: "fa-pen-to-square" },
    { key: "media", label: "Media", icon: "fa-images" },
    { key: "settings", label: "Site settings", icon: "fa-sliders" },
  ];

  return (
    <div className="fixed inset-0 z-[90] overflow-hidden bg-slate-100 text-slate-900">
      <div className="flex h-full">
        <aside className="hidden w-64 shrink-0 flex-col bg-slate-950 p-5 text-white lg:flex">
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#9b315b] font-bold">T</div>
            <div><p className="font-semibold">TAIT Admin</p><p className="text-xs text-slate-400">Website control center</p></div>
          </div>
          <nav className="mt-6 space-y-2">
            {nav.map((item) => (
              <button key={item.key} onClick={() => setSection(item.key)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm ${section === item.key ? "bg-[#7f264a] text-white" : "text-slate-300 hover:bg-white/10"}`}>
                <i className={`fa-solid ${item.icon} w-4`} />{item.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto space-y-2">
            <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10"><i className="fa-solid fa-arrow-up-right-from-square" />View website</a>
            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10"><i className="fa-solid fa-right-from-bracket" />Sign out</button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 overflow-y-auto">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7f264a]">Control center</p><h1 className="text-xl font-bold capitalize">{section}</h1></div>
              <button onClick={handleLogout} className="rounded-lg border border-slate-200 px-3 py-2 text-sm lg:hidden">Sign out</button>
            </div>
            <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">{nav.map((item) => <button key={item.key} onClick={() => setSection(item.key)} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${section === item.key ? "bg-[#7f264a] text-white" : "bg-slate-100"}`}>{item.label}</button>)}</nav>
          </header>

          <div className="p-5 lg:p-8">
            {notice && <div role="status" className="mb-5 flex justify-between rounded-xl border border-[#7f264a]/20 bg-[#7f264a]/5 px-4 py-3 text-sm text-[#6a1f3d]"><span>{notice}</span><button onClick={() => setNotice("")}>×</button></div>}

            {section === "overview" && (
              <div className="space-y-6">
                <div className="flex items-end justify-between"><div><h2 className="text-2xl font-bold">Website performance</h2><p className="text-sm text-slate-500">Privacy-friendly first-party analytics.</p></div><select value={days} onChange={(event) => setDays(Number(event.target.value))} className="rounded-lg border bg-white px-3 py-2 text-sm"><option value={7}>7 days</option><option value={30}>30 days</option><option value={90}>90 days</option></select></div>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Page views" value={analytics?.views ?? "—"} note={`Last ${days} days`} /><Metric label="Visitors" value={analytics?.visitors ?? "—"} note="Unique browser sessions" /><Metric label="Pages / visit" value={analytics?.pagesPerVisit ?? "—"} note="Engagement depth" /><Metric label="New messages" value={newCount} note="Awaiting review" /></div>
                <div className="grid gap-5 xl:grid-cols-3">
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2"><h3 className="font-semibold">Traffic trend</h3><div className="mt-6 flex h-48 items-end gap-1">{analytics?.daily.length ? analytics.daily.map((item) => <div key={item.date} title={`${item.date}: ${item.views}`} className="min-w-1 flex-1 rounded-t bg-[#7f264a]/80" style={{ height: `${Math.max((item.views / maxDaily) * 100, 4)}%` }} />) : <p className="m-auto text-sm text-slate-400">Analytics will appear as visitors browse the site.</p>}</div></section>
                  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="font-semibold">Devices</h3><div className="mt-5 space-y-4">{(["desktop", "mobile", "tablet"] as const).map((device) => { const count = analytics?.devices[device] ?? 0; const total = analytics?.views || 1; return <div key={device}><div className="mb-1 flex justify-between text-sm capitalize"><span>{device}</span><span>{count}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-[#7f264a]" style={{ width: `${(count / total) * 100}%` }} /></div></div>; })}</div></section>
                </div>
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b px-5 py-4 font-semibold">Top pages</div>{analytics?.topPages.map((page) => <div key={page.path} className="flex justify-between border-b border-slate-100 px-5 py-3 text-sm last:border-0"><span>{page.path}</span><span className="font-semibold">{page.views} views</span></div>)}</section>
              </div>
            )}

            {section === "inbox" && (
                <div><div className="mb-6"><h2 className="text-2xl font-bold">Form inbox</h2><p className="text-sm text-slate-500">Contact requests and work-with-us applications. Notifications include kachilad@tait.tz in CC.</p></div><div className="space-y-4">{submissions?.map((item) => <article key={item._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#7f264a]/10 px-2.5 py-1 text-xs font-semibold text-[#7f264a]">{item.kind === "contact" ? "Contact" : "Work with us"}</span><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.notificationStatus === "sent" ? "bg-emerald-100 text-emerald-700" : item.notificationStatus === "failed" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>Email {item.notificationStatus || "pending"}</span><span className="text-xs text-slate-400">{new Date(item.createdAt).toLocaleString()}</span></div><h3 className="mt-3 text-lg font-semibold">{item.name}</h3><p className="text-sm text-slate-500">{item.email}{item.phone ? ` · ${item.phone}` : ""}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">{item.category}</p></div><div className="flex gap-2"><select value={item.status} onChange={(event) => updateSubmission({ sessionToken: token, id: item._id, status: event.target.value as SubmissionStatus })} className="rounded-lg border px-3 py-2 text-sm"><option value="new">New</option><option value="in_progress">In progress</option><option value="resolved">Resolved</option><option value="archived">Archived</option></select><button onClick={() => { if (confirm("Delete this submission permanently?")) void removeSubmission({ sessionToken: token, id: item._id }); }} className="rounded-lg border border-rose-200 px-3 text-rose-700"><i className="fa-solid fa-trash" /></button></div></div>{item.message && <p className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm leading-6">{item.message}</p>}{item.notificationError && <p className="mt-3 text-xs text-rose-600">Delivery: {item.notificationError}</p>}<div className="mt-4 flex gap-3"><a href={`mailto:${item.email}`} className="text-sm font-semibold text-[#7f264a]">Reply by email</a>{item.phone && <a href={`https://wa.me/${item.phone.replace(/\D/g, "")}`} target="_blank" className="text-sm font-semibold text-emerald-700">WhatsApp</a>}</div></article>)}{submissions?.length === 0 && <p className="rounded-2xl bg-white p-8 text-center text-slate-500">No submissions yet.</p>}</div></div>
            )}

            {section === "pages" && <PageManager token={token} onNotice={setNotice} />}

            {section === "content" && (
              <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]"><section><div className="mb-4 flex items-center justify-between"><div><h2 className="text-2xl font-bold">Content library</h2><p className="text-sm text-slate-500">Articles, projects, publications, and reusable pages.</p></div><button onClick={() => setEntry(EMPTY_ENTRY)} className="rounded-lg bg-slate-950 px-3 py-2 text-sm text-white">New</button></div><div className="space-y-3">{entries?.map((item) => <button key={item._id} onClick={() => setEntry({ id: item._id, type: item.type, slug: item.slug, title: item.title, excerpt: item.excerpt ?? "", content: item.content, featuredImage: item.featuredImage ?? "", status: item.status })} className={`w-full rounded-xl border bg-white p-4 text-left shadow-sm ${entry.id === item._id ? "border-[#7f264a]" : "border-slate-200"}`}><div className="flex justify-between gap-3"><span className="font-semibold">{item.title}</span><span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${item.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{item.status}</span></div><p className="mt-1 text-xs text-slate-400">{item.type} · /{item.slug}</p></button>)}</div></section><form onSubmit={handleSaveEntry} className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-28"><div className="flex justify-between"><h3 className="text-lg font-bold">{entry.id ? "Edit content" : "Create content"}</h3>{entry.id && <button type="button" onClick={() => { if (confirm("Delete this content permanently?")) { void removeEntry({ sessionToken: token, id: entry.id! }); setEntry(EMPTY_ENTRY); } }} className="text-sm text-rose-700">Delete</button>}</div><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Content type<input value={entry.type} onChange={(e) => setEntry({ ...entry, type: e.target.value })} required className="mt-1 w-full rounded-lg border px-3 py-2" /></label><label className="text-sm font-medium">Status<select value={entry.status} onChange={(e) => setEntry({ ...entry, status: e.target.value as EntryStatus })} className="mt-1 w-full rounded-lg border px-3 py-2"><option value="draft">Draft</option><option value="published">Published</option></select></label></div><label className="block text-sm font-medium">Title<input value={entry.title} onChange={(e) => setEntry({ ...entry, title: e.target.value })} required className="mt-1 w-full rounded-lg border px-3 py-2" /></label><label className="block text-sm font-medium">Slug<input value={entry.slug} onChange={(e) => setEntry({ ...entry, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-") })} required className="mt-1 w-full rounded-lg border px-3 py-2" /></label><label className="block text-sm font-medium">Excerpt<textarea value={entry.excerpt} onChange={(e) => setEntry({ ...entry, excerpt: e.target.value })} rows={2} className="mt-1 w-full rounded-lg border px-3 py-2" /></label><label className="block text-sm font-medium">Featured image URL<input value={entry.featuredImage} onChange={(e) => setEntry({ ...entry, featuredImage: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label><label className="block text-sm font-medium">Content<textarea value={entry.content} onChange={(e) => setEntry({ ...entry, content: e.target.value })} rows={12} required className="mt-1 w-full rounded-lg border px-3 py-2 font-mono text-sm" /></label><button className="w-full rounded-xl bg-[#7f264a] px-4 py-3 font-semibold text-white">Save content</button></form></div>
            )}

            {section === "settings" && (
              <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]"><section><h2 className="text-2xl font-bold">Global site settings</h2><p className="mt-1 text-sm text-slate-500">Reusable configuration for contact details, social links, announcements, and organization information.</p><div className="mt-6 space-y-3">{settings?.map((item) => <button key={item._id} onClick={() => { setSettingKey(item.key); setSettingValue(JSON.stringify(item.value, null, 2)); }} className={`w-full rounded-xl border bg-white p-4 text-left shadow-sm ${settingKey === item.key ? "border-[#7f264a]" : "border-slate-200"}`}><p className="font-semibold capitalize">{item.key}</p><p className="mt-1 text-xs text-slate-400">Updated {new Date(item.updatedAt).toLocaleString()}</p></button>)}</div></section><form onSubmit={handleSaveSetting} className="h-fit space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:sticky xl:top-28"><h3 className="text-lg font-bold">Edit setting</h3><label className="block text-sm font-medium">Setting key<select value={settingKey} onChange={(e) => { setSettingKey(e.target.value); const found = settings?.find((item) => item.key === e.target.value); setSettingValue(found ? JSON.stringify(found.value, null, 2) : "{}"); }} className="mt-1 w-full rounded-lg border px-3 py-2"><option value="announcement">Announcement</option><option value="contact">Contact details</option><option value="social">Social links</option><option value="organization">Organization</option><option value="navigation">Navigation</option><option value="seo">SEO defaults</option></select></label><label className="block text-sm font-medium">JSON value<textarea value={settingValue} onChange={(e) => setSettingValue(e.target.value)} rows={18} spellCheck={false} className="mt-1 w-full rounded-lg border px-3 py-2 font-mono text-sm" /></label><p className="text-xs text-slate-500">Use valid JSON. Public settings are available to website components immediately.</p><button className="w-full rounded-xl bg-[#7f264a] px-4 py-3 font-semibold text-white">Save setting</button></form></div>
            )}

            {section === "media" && <MediaLibrary token={token} onNotice={setNotice} />}
          </div>
        </main>
      </div>
    </div>
  );
}
