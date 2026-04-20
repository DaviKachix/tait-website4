import OverviewSection from "./components/OverViewSection";
import DevelopmentSection from "./components/DevelopmentSection";
import MediaSection from "./components/MediaSection";
import ResearchSection from "./components/ResearchSection";

export default function StrategicAreasPage() {
  return (
    <main className="min-h-screen bg-white">
      <OverviewSection />
      <DevelopmentSection />
      <MediaSection />
      <ResearchSection />
    </main>
  );
}