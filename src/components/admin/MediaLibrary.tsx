"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

export default function MediaLibrary({ token, onNotice }: { token: string; onNotice: (message: string) => void }) {
  const assets = useQuery(api.media.list, { sessionToken: token });
  const getUploadUrl = useMutation(api.media.generateUploadUrl);
  const save = useMutation(api.media.save);
  const remove = useMutation(api.media.remove);
  const [uploading, setUploading] = useState(false);

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { onNotice("Choose an image file."); return; }
    if (file.size > 10 * 1024 * 1024) { onNotice("Images must be smaller than 10 MB."); return; }
    setUploading(true);
    try {
      const uploadUrl = await getUploadUrl({ sessionToken: token });
      const response = await fetch(uploadUrl, { method: "POST", headers: { "Content-Type": file.type }, body: file });
      if (!response.ok) throw new Error("Upload failed.");
      const result = await response.json() as { storageId: Id<"_storage"> };
      await save({ sessionToken: token, storageId: result.storageId, name: file.name, alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "), mimeType: file.type, size: file.size });
      onNotice("Image uploaded to the media library.");
    } catch (error) { onNotice(error instanceof Error ? error.message : "Upload failed."); }
    finally { setUploading(false); event.target.value = ""; }
  }

  return <div><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-2xl font-bold">Media library</h2><p className="text-sm text-slate-500">Central graphics, illustrations, photographs, and page imagery. Maximum 10 MB.</p></div><label className="cursor-pointer rounded-xl bg-[#7f264a] px-5 py-3 text-sm font-semibold text-white"><input type="file" accept="image/*" onChange={upload} disabled={uploading} className="hidden" />{uploading ? "Uploading…" : "+ Upload image"}</label></div><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{assets?.map((asset) => <article key={asset._id} className="group overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="relative aspect-square bg-slate-100"><img src={asset.url ?? ""} alt={asset.alt} className="h-full w-full object-cover" /><button onClick={() => { if (confirm("Delete this image permanently?")) void remove({ sessionToken: token, id: asset._id }); }} className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-2 text-rose-700 opacity-0 shadow group-hover:opacity-100"><i className="fa-solid fa-trash" /></button></div><div className="p-4"><p className="truncate font-semibold">{asset.name}</p><p className="mt-1 text-xs text-slate-400">{(asset.size / 1024).toFixed(0)} KB · {asset.mimeType}</p><button onClick={() => { if (asset.url) void navigator.clipboard.writeText(asset.url); onNotice("Image URL copied."); }} className="mt-3 text-xs font-semibold text-[#7f264a]">Copy image URL</button></div></article>)}</div>{assets?.length === 0 && <div className="mt-8 rounded-2xl border border-dashed bg-white p-14 text-center text-slate-500">Upload your first graphic or photograph.</div>}</div>;
}
