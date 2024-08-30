"use client";

import FooterHome from "@/components/footers/home";
import { SectionIntro, SectionServices, SectionSolution } from "@/components/sections";

export default function Home() {
  return (
    <section className="w-screen flex flex-cols-1">
      <SectionIntro />
      <SectionServices />
      <SectionSolution />
      <FooterHome />
    </section>
  );
}
