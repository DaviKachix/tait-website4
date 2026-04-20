import Hero from "@/components/home/hero/Hero";
import TaitChurch from "@/components/home/tait-church/TaitChurch";
import CoreFocus from "@/components/home/core-focus/CoreFocus";
import ChurchEmpowerment from "@/components/home/church-empowerment/ChurchEmpowerment";
import StrategicAreas from "@/components/home/strategic-areas/StrategicAreas";
import Testimony from "@/components/home/testimony/Testimony";
import Articles from "@/components/home/articles/Articles";
import MissionAlignment from "@/components/home/mission-alignment/MissionAlignment";

export default function Home() {
  return (
<main
  className="relative flex flex-col min-h-dvh bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/man-computer.webp')",
  }}
>
  {/* Grapevine soft tint overlay */}
  <div className="absolute inset-0 bg-[#7f264a]/10" />

  {/* optional extra soft white wash for readability */}
  <div className="absolute inset-0 bg-white/30" />

      {/* Hero */}
      <section>
        <Hero />
      </section>

      {/* Content Sections */}
      <div className="flex flex-col space-y-2">

        <section>
          <TaitChurch />
        </section>

        <section>
          <CoreFocus />
        </section>

        <section>
          <ChurchEmpowerment />
        </section>

        <section>
          <StrategicAreas />
        </section>

        <section>
          <Testimony />
        </section>

        <section>
          <Articles />
        </section>

        <section>
          <MissionAlignment />
        </section>

      </div>
    </main>
  );
}