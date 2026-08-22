import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Sahayta – Settle Down Fast in Your New City",
  description:
    "The ultimate platform for city newcomers. Find PGs & co-living, daily tiffin services, entry-level jobs, pre-owned furniture, local services, and city survival guides in your locality.",
  keywords: [
    "city newcomer",
    "PG finder",
    "co-living",
    "tiffin service",
    "city survival guide",
    "pre-owned furniture",
    "local services",
    "Sahayta",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-[#090D16] text-slate-100 antialiased selection:bg-[#2563EB] selection:text-white min-h-screen flex flex-col relative overflow-x-hidden`}
      >
        {/* Optimized GPU-friendly ambient background using radial-gradients */}
        <div
          className="fixed inset-0 pointer-events-none -z-10"
          style={{
            background: `
              radial-gradient(circle at 20% 15%, rgba(37, 99, 235, 0.12) 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.08) 0%, transparent 45%),
              radial-gradient(circle at 85% 20%, rgba(245, 158, 11, 0.06) 0%, transparent 35%)
            `,
          }}
        />

        {/* Global Radial Grid Texture */}
        <div className="fixed inset-0 opacity-15 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10" />

        {children}
      </body>
    </html>
  );
}
