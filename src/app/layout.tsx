import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "MPM Motor Blitar | Dealer Resmi Sepeda Motor Honda & Bengkel AHASS",
  description: "Portal resmi penjualan sepeda motor Honda dan bengkel AHASS MPM Motor Blitar, Jl. S. Supriadi No. 79. Cek daftar harga OTR Blitar, promo DP, dan simulasi kredit resmi.",
  keywords: [
    "dealer honda blitar",
    "mpm motor blitar",
    "kredit beat blitar",
    "promo motor honda blitar",
    "harga motor honda blitar",
    "bengkel ahass blitar",
    "pcx 160 blitar",
    "scoopy blitar"
  ],
  authors: [{ name: "MPM Motor Blitar" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 antialiased selection:bg-[#E4002B] selection:text-white">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
