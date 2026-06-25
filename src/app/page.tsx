import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageChrome } from "@/components/ui/Decorative";
import { Hero } from "@/components/sections/Hero";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { WhyTekris } from "@/components/sections/WhyTekris";
import { Process } from "@/components/sections/Process";
import { CurrentFocus } from "@/components/sections/CurrentFocus";
import { Credibility } from "@/components/sections/Credibility";

export default function Home() {
  return (
    <PageChrome>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WhatWeBuild />
        <WhyTekris />
        <Process />
        <CurrentFocus />
        <Credibility />
      </main>
      <Footer />
    </PageChrome>
  );
}
