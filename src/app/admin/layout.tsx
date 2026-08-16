import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard — Unique Engineering",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07070D] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07070D]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-[#F05A00]"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Website</span>
            </Link>
          </div>
          <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
            <span className="text-[#F05A00]">Admin</span> Dashboard
          </h1>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}
