import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import AnalogyPanel from "./components/AnalogyPanel.jsx";
import ReasoningLab from "./components/ReasoningLab.jsx";
import CostAccuracyChart from "./components/CostAccuracyChart.jsx";
import ArchitectureDeepDive from "./components/ArchitectureDeepDive.jsx";
import ArchitectureNotes from "./components/ArchitectureNotes.jsx";
import Footer from "./components/Footer.jsx";
import GuidedTourPopover from "./components/GuidedTourPopover.jsx";

export default function App() {
  const [effort, setEffort] = useState(10);

  return (
    <div className="texture-grain min-h-screen">
      <Header />
      <main>
        <Hero />
        <AnalogyPanel />
        <ReasoningLab effort={effort} setEffort={setEffort} />
        <CostAccuracyChart effort={effort} />
        <ArchitectureDeepDive />
        <ArchitectureNotes />
      </main>
      <Footer />
      <GuidedTourPopover />
    </div>
  );
}
