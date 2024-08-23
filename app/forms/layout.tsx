"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-[rgb(255,255,255)] flex justify-center">
        {children}
      </section>
    </>
  );
}
