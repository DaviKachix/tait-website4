"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen -mt-24 lg:-mt-28 overflow-hidden bg-slate-950 text-white animate-heroScene">
      <Image
        src="/images/bible-laptop.jpg"
        alt="Bible and laptop for church ministry"
        fill
        priority
        className="object-cover object-center animate-heroImage"
      />

      <div className="absolute inset-0 bg-slate-950/70 animate-overlayPulse" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/95 animate-overlayFlow" />

      <div className="relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center sm:px-8 lg:px-12">
        <div className="w-full max-w-4xl space-y-8">
          <h1 className="animate-heroHeadline text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            TECHNOLOGY AT THE HEART OF THE MISSION
          </h1>

          <p className="animate-heroCopy mx-auto max-w-2xl text-xl leading-9 text-white/85 sm:text-2xl">
            Solutions that strengthen institutions and extend mission reach.
          </p>

          <div className="animate-heroActions mx-auto flex flex-wrap justify-center gap-4">
            <Link
              href="/strategic-areas"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-[#7f264a] px-10 py-4 text-base font-semibold text-white transition hover:bg-[#5c1f39]"
            >
              Explore Our Work
            </Link>
            <Link
              href="/work-with-us"
              className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-white/10 px-10 py-4 text-base font-semibold text-white transition hover:bg-white hover:text-[#7f264a]"
            >
              Join the Mission
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <div className="h-1.5 w-24 rounded-full bg-white/15 shadow-[0_0_35px_rgba(255,255,255,0.2)] animate-pulseLine" />
      </div>

      <style jsx>{`
        .animate-heroScene {
          animation: heroSceneEase 1s ease-out forwards, heroSceneAmbient 30s ease-in-out infinite alternate;
        }

        .animate-heroImage {
          animation: imageGlide 1.4s ease-out forwards, imageDrift 30s ease-in-out infinite alternate;
          transform: scale(1.02);
        }

        .animate-overlayPulse {
          animation: overlayPulse 10s ease-in-out infinite alternate;
        }

        .animate-overlayFlow {
          animation: overlayFlow 30s linear infinite;
        }

        .animate-heroHeadline,
        .animate-heroCopy,
        .animate-heroActions {
          opacity: 0;
          transform: translateY(26px) scale(0.98);
          animation: heroFadeUp 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .animate-heroHeadline {
          animation-delay: 0.18s;
        }

        .animate-heroCopy {
          animation-delay: 0.3s;
        }

        .animate-heroActions {
          animation-delay: 0.44s;
        }

        @keyframes heroSceneEase {
          from {
            opacity: 0.96;
            transform: scale(0.994);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes imageGlide {
          0% {
            transform: scale(1.04) translateY(10px);
            filter: saturate(0.9);
          }
          100% {
            transform: scale(1.02) translateY(0);
            filter: saturate(1);
          }
        }

        @keyframes overlayPulse {
          0% {
            opacity: 0.68;
          }
          100% {
            opacity: 0.82;
          }
        }

        @keyframes overlayFlow {
          0% {
            transform: translateY(0px) skewY(0.45deg);
          }
          50% {
            transform: translateY(-14px) skewY(-0.32deg);
          }
          100% {
            transform: translateY(0px) skewY(0.45deg);
          }
        }

        @keyframes heroFadeUp {
          0% {
            opacity: 0;
            transform: translateY(26px) scale(0.98);
          }
          72% {
            opacity: 1;
            transform: translateY(-6px) scale(1.005);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes heroSceneAmbient {
          0% {
            filter: brightness(0.98) saturate(0.96);
            transform: scale(0.9995);
          }
          50% {
            filter: brightness(1.04) saturate(1.08);
            transform: scale(1.0007);
          }
          100% {
            filter: brightness(0.98) saturate(0.96);
            transform: scale(0.9995);
          }
        }

        @keyframes imageDrift {
          0% {
            transform: scale(1.02) translateY(0px) translateX(0px);
          }
          25% {
            transform: scale(1.022) translateY(-6px) translateX(6px);
          }
          50% {
            transform: scale(1.02) translateY(-2px) translateX(-4px);
          }
          75% {
            transform: scale(1.023) translateY(4px) translateX(2px);
          }
          100% {
            transform: scale(1.02) translateY(0px) translateX(0px);
          }
        }

        .animate-pulseLine {
          animation: pulseLine 2.8s ease-in-out infinite;
        }

        @keyframes pulseLine {
          0%, 100% {
            opacity: 0.75;
            transform: scaleX(1);
          }
          50% {
            opacity: 0.3;
            transform: scaleX(0.92);
          }
        }
      `}</style>
    </section>
  );
}
