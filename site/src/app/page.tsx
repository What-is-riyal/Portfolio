import { SiteShell } from "@/components/layout/SiteShell";
import { AboutBand } from "@/components/home/AboutBand";
import { HomeHero } from "@/components/home/HomeHero";
import { SkimBand } from "@/components/home/SkimBand";
import { WorkList } from "@/components/home/WorkList";

export default function HomePage() {
  return (
    <SiteShell footerFlush>
      <HomeHero />
      <SkimBand />
      <WorkList />
      <AboutBand />
    </SiteShell>
  );
}
