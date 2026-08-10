"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function SiteAnnouncement() {
  const settings = useQuery(api.settings.getPublic);
  const announcement = settings?.announcement as { enabled?: boolean; message?: string; link?: string } | undefined;
  if (!announcement?.enabled || !announcement.message) return null;

  return (
    <div className="bg-[#7f264a] px-5 py-2.5 text-center text-sm font-medium text-white">
      {announcement.link ? <a href={announcement.link} className="underline underline-offset-4">{announcement.message}</a> : announcement.message}
    </div>
  );
}
