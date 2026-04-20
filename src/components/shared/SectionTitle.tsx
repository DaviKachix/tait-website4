export default function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl md:text-4xl font-bold text-[#7f264a] tracking-tight leading-tight">
        {title}
      </h2>

      {/* subtle underline accent */}
      <div className="mt-3 w-16 h-[3px] bg-[#7f264a]/40 rounded-full" />
    </div>
  );
}