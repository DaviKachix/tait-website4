// app/loading.tsx

import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">

      {/* SPINNER WRAPPER */}
      <div className="relative w-24 h-24 flex items-center justify-center">

        {/* ROTATING RING */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-[#7f264a] animate-spin" />

        {/* LOGO (STATIC) */}
        <div className="relative w-14 h-14">
          <Image
            src="/images/TAIT.jpg"
            alt="TAIT Logo"
            fill
            className="object-contain rounded-full"
            priority
          />
        </div>

      </div>

    </div>
  );
}