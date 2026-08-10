"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function PublishedArticles() {
  const articles = useQuery(api.cms.listPublished, { type: "article" });
  if (articles === undefined) return <p className="mt-10 text-center text-sm text-slate-400">Loading publications…</p>;
  if (articles.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="mb-6 flex items-end justify-between border-b border-slate-200 pb-3">
        <h2 className="text-2xl font-bold text-slate-900">Latest from TAIT</h2>
        <span className="text-sm text-slate-500">{articles.length} published</span>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <Link key={article._id} href={`/articles/${article.slug}`} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            {article.featuredImage && <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${article.featuredImage})` }} />}
            <div className="p-6"><p className="text-xs font-semibold uppercase tracking-wider text-[#7f264a]">Article</p><h3 className="mt-2 text-xl font-semibold text-slate-900">{article.title}</h3>{article.excerpt && <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
