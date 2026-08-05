import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-24 text-center">
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-12 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#7f264a]">
          Page not found
        </p>
        <h1 className="mt-6 text-5xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-gray-600 leading-relaxed">
          We couldn’t find the page you were looking for. Please check the URL or return to the TAIT homepage.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-3xl bg-[#7f264a] px-6 py-3 text-white shadow transition hover:bg-[#6d2240]"
          >
            Back to home
          </Link>
          <Link
            href="/contact"
            className="rounded-3xl border border-[#7f264a] px-6 py-3 text-[#7f264a] shadow-sm transition hover:bg-[#7f264a]/5"
          >
            Contact TAIT
          </Link>
        </div>
      </div>
    </main>
  );
}
