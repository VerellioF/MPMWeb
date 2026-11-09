"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { MOTOR_CATALOG, SALES_TEAM, DEALER_INFO, MotorModel, SalesConsultant } from "@/data/motorData";

export interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discount: string;
  active: boolean;
}

export interface NewsEventItem {
  id: string;
  type: "event" | "news"; // Event atau Berita/Tips
  title: string;
  category: string; // e.g. "Event Komunitas", "Servis Kunjung", "Promo & Bazar", "Tips Perawatan", "Pengumuman"
  summary: string;
  content: string;
  date: string; // e.g. "20 Maret 2026"
  time?: string; // e.g. "08.00 - 15.00 WIB"
  location?: string; // e.g. "Halaman Showroom MPM Motor Blitar"
  image: string;
  status: "upcoming" | "ongoing" | "completed";
}

export interface SiteData {
  dealerInfo: typeof DEALER_INFO;
  salesTeam: SalesConsultant[];
  motorCatalog: MotorModel[];
  promos: PromoItem[];
  newsEvents?: NewsEventItem[];
  security?: {
    pin: string;
    lastChanged?: string;
  };
  lastUpdated?: string;
}

interface SiteDataContextType {
  data: SiteData;
  isLoading: boolean;
  refreshData: () => Promise<void>;
  saveData: (newStore: Partial<SiteData>) => Promise<boolean>;
}

const defaultInitialData: SiteData = {
  dealerInfo: DEALER_INFO,
  salesTeam: SALES_TEAM,
  motorCatalog: MOTOR_CATALOG,
  promos: [
    {
      id: "promo-1",
      title: "Promo DP Ringan BeAT & Scoopy",
      subtitle: "Cukup bayar DP mulai Rp 500 Ribu, proses kilat tanpa ribet khusus KTP Blitar.",
      badge: "Terpopuler",
      discount: "Potongan DP Rp 1.000.000",
      active: true,
    },
    {
      id: "promo-2",
      title: "Subsidi Angsuran Vario 160 & PCX 160",
      subtitle: "Dapatkan potongan tenor hingga 2 bulan dan voucher servis gratis di AHASS MPM.",
      badge: "Spesial Skutik Besar",
      discount: "Hemat hingga Rp 2.500.000",
      active: true,
    },
    {
      id: "promo-3",
      title: "Program Tukar Tambah (Trade-in)",
      subtitle: "Tukar motor lama segala merek dengan motor Honda baru, nilai taksiran tinggi & transparan.",
      badge: "Semua Merek",
      discount: "Bonus Ekstra Cashback",
      active: true,
    },
  ],
  newsEvents: [
    {
      id: "event-1",
      type: "event",
      title: "Honda AT Family Day & Test Ride Blitar 2026",
      category: "Event Showroom",
      summary: "Uji coba langsung performa Honda Stylo 160 & Vario 160, dapatkan merchandise eksklusif dan diskon servis di lokasi.",
      content: "Saksikan dan ikuti keseruan Honda AT Family Day bersama MPM Motor Blitar! Pengunjung dapat mencoba test ride lini matic Honda terbaru, menikmati live acoustic music, bazaar UMKM Blitar, serta layanan servis ganti oli gratis untuk 50 pendaftar pertama.",
      date: "25 Maret 2026",
      time: "08.00 – 16.00 WIB",
      location: "Halaman Parkir Showroom MPM Motor Blitar (Jl. S. Supriadi No. 79)",
      image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
      status: "upcoming"
    },
    {
      id: "event-2",
      type: "event",
      title: "Layanan AHASS Servis Kunjung ke Sekolah & Kantor",
      category: "Servis Kunjung",
      summary: "AHASS MPM Blitar hadir langsung ke instansi Anda tanpa antre, hemat waktu dengan jaminan teknisi bersertifikasi.",
      content: "Program jemput bola AHASS Servis Kunjung siap melayani pengecekan motor Honda, ganti oli, dan tune-up ringan langsung di lokasi kantor atau sekolah Anda di area Blitar Raya. Hubungi admin showroom kami untuk reservasi jadwal kunjungan armada kami.",
      date: "Setiap Hari Rabu & Sabtu",
      time: "09.00 – 14.00 WIB",
      location: "Area Instansi / Sekolah Terpilih di Kota & Kab. Blitar",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80",
      status: "ongoing"
    },
    {
      id: "news-1",
      type: "news",
      title: "5 Tips Merawat Injeksi PGM-FI Agar Tarikan Tetap Bertenaga & Irit",
      category: "Tips & Edukasi",
      summary: "Panduan praktis merawat sistem injeksi elektronik dan filter udara motor Honda kesayangan Anda dari teknisi ahli AHASS.",
      content: "Sistem injeksi PGM-FI Honda dirancang presisi untuk menghasilkan pembakaran optimal dan efisiensi bahan bakar maksimal. Untuk menjaga performanya: 1) Gunakan bahan bakar berkualitas dengan oktan yang dianjurkan; 2) Bersihkan throttle body dan injektor secara berkala setiap 10.000 km; 3) Ganti filter udara tepat waktu; 4) Periksa kondisi busi; 5) Selalu servis rutin di bengkel resmi AHASS MPM Blitar.",
      date: "05 Maret 2026",
      image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
      status: "completed"
    }
  ],
  security: {
    pin: "admin123",
    lastChanged: "2026-11-09T00:00:00.000Z",
  },
};

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultInitialData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLiveStore = async () => {
    try {
      const res = await fetch("/api/admin/data", { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setData((prev) => ({
            ...prev,
            ...json.data,
          }));
        }
      }
    } catch (err) {
      console.warn("Failed to fetch live site data, using static default:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveStore();
  }, []);

  const saveData = async (newStore: Partial<SiteData>): Promise<boolean> => {
    try {
      const storedToken = typeof window !== "undefined" 
        ? sessionStorage.getItem("mpm_admin_token") || localStorage.getItem("mpm_admin_token")
        : null;

      const headers: Record<string, string> = { 
        "Content-Type": "application/json" 
      };
      if (storedToken) {
        headers["Authorization"] = `Bearer ${storedToken}`;
        headers["x-admin-token"] = storedToken;
      }

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(newStore),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setData(json.data);
          return true;
        }
      }
      return false;
    } catch (e) {
      console.error("Failed to save data:", e);
      return false;
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        data,
        isLoading,
        refreshData: fetchLiveStore,
        saveData,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
