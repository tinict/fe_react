"use client";

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
      {children}
    </>
  )
};
