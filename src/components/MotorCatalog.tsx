"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "@/components/Icons";
import { MOTOR_CATALOG, MotorModel } from "@/data/motorData";
import { useSiteData } from "@/context/SiteDataContext";
import MotorCard from "./MotorCard";

interface MotorCatalogProps {
  onSelectForSimulation: (motor: MotorModel) => void;
}

export default function MotorCatalog({ onSelectForSimulation }: MotorCatalogProps) {
  const { data } = useSiteData();
  const motorCatalog = data?.motorCatalog || MOTOR_CATALOG;
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");

  const categories = [
    { id: "all", label: "Semua Motor" },
    { id: "matic", label: "Matic / Skutik" },
    { id: "sport", label: "Sport & Trail" },
    { id: "cub", label: "Bebek (Cub)" },
    { id: "ev", label: "Motor Listrik (EV)" },
  ];

  const filteredMotors = useMemo(() => {
    return motorCatalog.filter((motor) => {
      const matchCategory = activeCategory === "all" || motor.category === activeCategory;
      const matchSearch =
        motor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        motor.engine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        motor.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceOTR - b.priceOTR;
      if (sortBy === "price-desc") return b.priceOTR - a.priceOTR;
      return 0;
    });
  }, [motorCatalog, activeCategory, searchQuery, sortBy]);

  return (
    <section id="katalog" className="py-16 lg:py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-bold text-[#E4002B] uppercase tracking-wider block mb-1">
              Katalog Resmi Showroom Honda Blitar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Daftar Harga OTR & Lini Motor Honda Terbaru
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Pilihan lengkap motor matic, sport, cub, dan motor listrik bergaransi resmi Astra Honda Motor. Sesuaikan varian, cek pilihan warna, dan hitung cicilan langsung di tempat.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Tersedia <strong className="text-slate-900 font-bold">{filteredMotors.length}</strong> model motor
          </div>
        </div>

        {/* Filter & Search Bar (Signature Kars Dealership Bar) */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Category Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition border ${
                    activeCategory === cat.id
                      ? "bg-[#E4002B] text-white border-[#E4002B] shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Search Box */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari model motor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#E4002B] focus:bg-white transition"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-4 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#E4002B] transition appearance-none cursor-pointer"
                >
                  <option value="default">Urutan: Rekomendasi</option>
                  <option value="price-asc">Harga OTR: Terendah</option>
                  <option value="price-desc">Harga OTR: Tertinggi</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Motorcycle Grid */}
        {filteredMotors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMotors.map((motor) => (
              <MotorCard
                key={motor.id}
                motor={motor}
                onSelectForSimulation={onSelectForSimulation}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 space-y-3">
            <p className="text-slate-500 text-sm">Tidak ditemukan motor dengan kriteria tersebut.</p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-lg bg-[#E4002B] text-white text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
