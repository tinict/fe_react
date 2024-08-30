"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-[#1E2A55] w-full p-3">
        <div className="flex flex-col flex-wrap gap-3">
          <Breadcrumbs className="p-3">
            <BreadcrumbItem color="warning">
              <span className="text-[#FFFFFF]">Home</span>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="text-[#FFFFFF]">Forms</span>
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="p-3">
          <span className="text-[#FFFFFF]">
            Designing Modern and Interactive Forms
          </span>
        </div>
      </section>
      <section className="md:mx-auto sm:mx-auto lg:mx-auto xl:mx-auto px-[24px]">
        {children}
      </section>
    </>
  );
}
