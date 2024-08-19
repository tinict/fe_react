"use client";

import { HeadQuiz } from "../../../head-quiz";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-[rgb(255,255,255)] flex flex-col justify-center w-full">
        <HeadQuiz />
        <section className="flex justify-center">{children}</section>
      </section>
    </>
  );
}
