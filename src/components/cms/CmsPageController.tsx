"use client";

import { usePathname } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import PageRenderer from "./PageRenderer";
import { useEffect } from "react";

export default function CmsPageController({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const page = useQuery(api.pages.getPublished, pathname.startsWith("/admin") ? "skip" : { path: pathname });
  useEffect(() => {
    if (!page) return;
    document.title = `${page.title} | TAIT`;
    if (page.description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
      meta.content = page.description;
    }
  }, [page]);
  if (!page) return children;
  return <PageRenderer title={page.title} sections={page.sections} />;
}
