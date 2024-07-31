"use client";

import { User } from "@nextui-org/react";
import { Metadata } from "next";
import { HeadQuiz } from "../../../head-quiz";

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className="bg-[rgb(255,255,255)] flex flex-col justify-center w-full">
        <HeadQuiz />
        <section className="flex justify-center">
          {children}
        </section>
      </section>
    </>
  )
};
