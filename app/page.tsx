"use client";

import {
  SectionIntro,
  SectionProducts,
  SectionServices,
  SectionSolution,
} from "@/components/sections";

export default function Home() {
  return (
    <section>
      <section className="snap-start"></section>
      <SectionIntro />
      <SectionServices />
      <SectionProducts />
      <SectionSolution />
      <section className="snap-start"></section>
    </section>
  );
}
