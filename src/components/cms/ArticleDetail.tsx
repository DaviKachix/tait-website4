"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ArticleDetail({ slug }: { slug: string }) {
  const article = useQuery(api.cms.getPublished, { slug });
  if (article === undefined) return <div className="mx-auto max-w-3xl px-6 py-24 text-center text-slate-500">Loading article…</div>;
  if (article === null) return <div className="mx-auto max-w-3xl px-6 py-24 text-center"><h1 className="text-3xl font-bold">Article not found</h1><Link href="/articles" className="mt-5 inline-block text-[#7f264a] underline">Back to articles</Link></div>;

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <Link href="/articles" className="text-sm font-semibold text-[#7f264a]">← All articles</Link>
      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-[#7f264a]">TAIT publication</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight text-slate-950 md:text-6xl">{article.title}</h1>
      {article.excerpt && <p className="mt-6 text-xl leading-8 text-slate-600">{article.excerpt}</p>}
      {article.featuredImage && <div className="mt-10 aspect-[16/8] rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${article.featuredImage})` }} />}
      <div className="mt-10 whitespace-pre-wrap text-base leading-8 text-slate-700">{article.content}</div>
    </article>
  );
}
