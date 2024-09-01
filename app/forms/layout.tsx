"use client";

import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { Image } from "@nextui-org/image";
import { iconForms } from '@/utils/medias';

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
        <div className="p-3 flex items-center gap-4">
          <Image
            width={50}
            height={50}
            alt="NextUI hero Image with delay"
            radius="md"
            src={iconForms.src}
          />
          <div>
            <h1 className="text-[#FFFFFF] text-lg font-bolder">
              ZealFlow Forms
            </h1>
            <span className="text-[#FFFFFF] text-xs">
              Helps you create online forms and surveys
            </span>
          </div>
        </div>
      </section>
      <section className="px-[24px]">
        {children}
      </section>
    </>
  );
}
