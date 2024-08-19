"use client";

import FooterHome from "@/components/footers/home";
import { SectionIntro, SectionServices, SectionSolution } from "@/components/sections";

export default function Home() {
  return (
    <section className="w-screen flex flex-col">
      <SectionIntro />
      <SectionServices />
      <SectionSolution />

      <FooterHome />
    </section>
  );
}
