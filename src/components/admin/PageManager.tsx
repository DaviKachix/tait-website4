"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import PageRenderer from "@/components/cms/PageRenderer";

const SITE_ROUTES = ["/", "/about", "/services", "/projects", "/systems", "/platforms", "/tools", "/research", "/training", "/media-mission", "/strategic-areas", "/articles", "/support", "/work-with-us", "/contact", "/socials"];
const starterSections = [
  { type: "hero", eyebrow: "TAIT", heading: "Page headline", body: "A clear introduction to this page and its purpose.", image: "", buttonLabel: "Learn more", buttonUrl: "/contact" },
  { type: "features", heading: "What we do", body: "Edit these cards to explain the most important parts.", items: [{ icon: "fa-lightbulb", title: "First focus", body: "Describe this focus area." }, { icon: "fa-users", title: "Second focus", body: "Describe this focus area." }, { icon: "fa-chart-line", title: "Third focus", body: "Describe this focus area." }] },
  { type: "cta", heading: "Ready to work with TAIT?", body: "Start a conversation with our team.", buttonLabel: "Contact us", buttonUrl: "/contact" },
];

type PageState = { id?: Id<"cmsPages">; path: string; title: string; description: string; status: "draft" | "published"; sectionsText: string };
const emptyPage: PageState = { path: "/", title: "", description: "", status: "draft", sectionsText: JSON.stringify(starterSections, null, 2) };

export default function PageManager({ token, onNotice }: { token: string; onNotice: (message: string) => void }) {
  const pages = useQuery(api.pages.listAdmin, { sessionToken: token });
  const save = useMutation(api.pages.upsert);
  const remove = useMutation(api.pages.remove);
  const [editor, setEditor] = useState<PageState>(emptyPage);
  const [preview, setPreview] = useState(false);
  let parsedSections: unknown[] = [];
  try { const parsed: unknown = JSON.parse(editor.sectionsText); if (Array.isArray(parsed)) parsedSections = parsed; } catch { /* Shown during save. */ }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    try {
      const sections: unknown = JSON.parse(editor.sectionsText);
      if (!Array.isArray(sections)) throw new Error("Sections must be a JSON array.");
      await save({ sessionToken: token, ...(editor.id ? { id: editor.id } : {}), path: editor.path, title: editor.title, description: editor.description || undefined, status: editor.status, sections });
      onNotice("Page saved. Published changes are now live.");
    } catch (error) { onNotice(error instanceof Error ? error.message : "Unable to save page."); }
  }

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold">Visual page controller</h2><p className="text-sm text-slate-500">Every public route is mapped. Published CMS pages replace the original page while drafts remain private.</p></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{SITE_ROUTES.map((route) => { const managed = pages?.find((page) => page.path === route); return <button key={route} onClick={() => managed ? setEditor({ id: managed._id, path: managed.path, title: managed.title, description: managed.description ?? "", status: managed.status, sectionsText: JSON.stringify(managed.sections, null, 2) }) : setEditor({ ...emptyPage, path: route, title: route === "/" ? "Home" : route.slice(1).split("-").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ") })} className={`rounded-xl border p-4 text-left ${managed ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"}`}><div className="flex justify-between"><span className="font-mono text-sm">{route}</span><span className={`h-2.5 w-2.5 rounded-full ${managed?.status === "published" ? "bg-emerald-500" : managed ? "bg-amber-500" : "bg-slate-300"}`} /></div><p className="mt-2 text-xs text-slate-500">{managed ? managed.status : "Original design"}</p></button>; })}</div>
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form onSubmit={submit} className="h-fit space-y-4 rounded-2xl border bg-white p-5 shadow-sm"><div className="flex justify-between"><h3 className="font-bold">Page configuration</h3><button type="button" onClick={() => setPreview(!preview)} className="text-sm font-semibold text-[#7f264a]">{preview ? "Edit" : "Preview"}</button></div><label className="block text-sm font-medium">Route path<input value={editor.path} onChange={(e) => setEditor({ ...editor, path: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2 font-mono" required /></label><label className="block text-sm font-medium">Page title<input value={editor.title} onChange={(e) => setEditor({ ...editor, title: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" required /></label><label className="block text-sm font-medium">SEO description<textarea value={editor.description} onChange={(e) => setEditor({ ...editor, description: e.target.value })} rows={3} className="mt-1 w-full rounded-lg border px-3 py-2" /></label><label className="block text-sm font-medium">Visibility<select value={editor.status} onChange={(e) => setEditor({ ...editor, status: e.target.value as "draft" | "published" })} className="mt-1 w-full rounded-lg border px-3 py-2"><option value="draft">Draft — private</option><option value="published">Published — live</option></select></label><button className="w-full rounded-xl bg-[#7f264a] px-4 py-3 font-semibold text-white">Save page</button>{editor.id && <button type="button" onClick={() => { if (confirm("Remove CMS control and restore the original page?")) { void remove({ sessionToken: token, id: editor.id! }); setEditor(emptyPage); } }} className="w-full text-sm text-rose-700">Remove override</button>}</form>
        <div className="min-w-0 overflow-hidden rounded-2xl border bg-white shadow-sm">{preview ? <div className="max-h-[800px] overflow-y-auto"><PageRenderer title={editor.title} sections={parsedSections} /></div> : <div><div className="border-b bg-slate-50 px-5 py-3"><p className="font-semibold">Section composer</p><p className="text-xs text-slate-500">Supported: hero, text, features, imageText, stats, gallery, cta. Reorder objects to reorder sections.</p></div><textarea value={editor.sectionsText} onChange={(e) => setEditor({ ...editor, sectionsText: e.target.value })} spellCheck={false} className="h-[720px] w-full resize-none p-5 font-mono text-xs leading-6 outline-none" /></div>}</div>
      </div>
    </div>
  );
}
