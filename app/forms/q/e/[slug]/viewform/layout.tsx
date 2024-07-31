"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { User } from "@nextui-org/react";
import { Metadata } from "next";

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
      <section className="bg-[rgb(255,255,255)] flex justify-center">
        {children}
      </section>
    </>
  )
};
