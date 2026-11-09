"use client";

import React, { useState } from "react";
import { Calendar, Clock, MapPin, MessageSquare, ChevronRight, X } from "@/components/Icons";
import { useSiteData, NewsEventItem } from "@/context/SiteDataContext";

export default function NewsAndEventsSection() {
  const { data } = useSiteData();
  const [filterType, setFilterType] = useState<"all" | "event" | "news">("all");
  const [selectedItem, setSelectedItem] = useState<NewsEventItem | null>(null);

  const items: NewsEventItem[] = data?.newsEvents || [];

  const filteredItems = items.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  const defaultWa = data?.dealerInfo?.whatsappSales || "6281234567891";

  const handleOpenWaRegistration = (item: NewsEventItem) => {
    const text = encodeURIComponent(
      `Halo MPM Motor Blitar, saya membaca informasi "${item.title}" di website resmi. Saya ingin bertanya info pendaftaran dan ketentuannya. Terima kasih.`
    );
    window.open(`https://wa.me/${defaultWa}?text=${text}`, "_blank");
  };

  // Safe fallback image if external URL fails
  const fallbackImage = "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80";

  if (items.length === 0) return null;

  return (
    <section id="event-berita" className="py-16 lg:py-24 bg-[#F8FAFC] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-[#E4002B] uppercase tracking-wider block mb-1">
              Seputar MPM Motor Blitar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Agenda Showroom & Berita Terkini
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Ikuti jadwal kegiatan showroom, promo event komunitas motor Honda, serta edukasi perawatan resmi AHASS.
            </p>
          </div>

          {/* Filter Segmented Controls */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                filterType === "all"
                  ? "bg-[#E4002B] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Semua ({items.length})
            </button>
            <button
              onClick={() => setFilterType("event")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                filterType === "event"
                  ? "bg-[#E4002B] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Event & Agenda ({items.filter((i) => i.type === "event").length})
            </button>
            <button
              onClick={() => setFilterType("news")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                filterType === "news"
                  ? "bg-[#E4002B] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Tips & Edukasi ({items.filter((i) => i.type === "news").length})
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* 16:9 Image Banner */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image || fallbackImage}
                    alt={item.title}
                    onError={(e) => {
                      // Prevent broken alt collision
                      const target = e.currentTarget;
                      if (target.src !== fallbackImage) {
                        target.src = fallbackImage;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Gradient Overlay for Date Tag */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent pointer-events-none" />

                  {/* Category Chip */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs border border-slate-200/80">
                      {item.category}
                    </span>
                  </div>

                  {/* Status Indicator (Real CSS dots, no emojis) */}
                  <div className="absolute top-3 right-3 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold tracking-wide shadow-xs ${
                        item.status === "upcoming"
                          ? "bg-[#E4002B] text-white"
                          : item.status === "ongoing"
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-800 text-slate-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "upcoming"
                            ? "bg-white animate-pulse"
                            : item.status === "ongoing"
                            ? "bg-emerald-300"
                            : "bg-slate-400"
                        }`}
                      />
                      <span>
                        {item.status === "upcoming" && "Mendatang"}
                        {item.status === "ongoing" && "Berlangsung"}
                        {item.status === "completed" && "Selesai"}
                      </span>
                    </span>
                  </div>

                  {/* Date Tag at Bottom Image */}
                  <div className="absolute bottom-2.5 left-3 text-white flex items-center gap-1.5 text-[11px] font-semibold drop-shadow-xs z-10">
                    <Calendar className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#E4002B] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* Event Details (Time & Location) */}
                  {(item.time || item.location) && (
                    <div className="space-y-1 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                      {item.time && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium text-slate-700">{item.time}</span>
                        </div>
                      )}
                      {item.location && (
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#E4002B] shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-700 line-clamp-1">{item.location}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition border border-slate-200 cursor-pointer"
                >
                  <span>Baca Rincian</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {item.type === "event" ? (
                  <button
                    type="button"
                    onClick={() => handleOpenWaRegistration(item)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#E4002B] hover:bg-[#C50025] text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Daftar via WA</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="flex items-center justify-center gap-1 px-3 py-2 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    <span>Artikel Lengkap</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full overflow-hidden border border-slate-200 my-auto animate-scale-up">
            
            {/* Header Image */}
            <div className="relative aspect-video w-full bg-slate-100">
              <img
                src={selectedItem.image || fallbackImage}
                alt={selectedItem.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== fallbackImage) target.src = fallbackImage;
                }}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 p-1.5 bg-slate-900/80 text-white rounded-full hover:bg-black transition backdrop-blur-xs cursor-pointer"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="absolute bottom-3 left-4">
                <span className="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-[#E4002B] text-white shadow-md">
                  {selectedItem.category}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
                  {selectedItem.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-[#E4002B]" />
                    {selectedItem.date}
                  </span>
                  {selectedItem.time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {selectedItem.time}
                    </span>
                  )}
                  {selectedItem.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#E4002B]" />
                      {selectedItem.location}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {selectedItem.content || selectedItem.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition cursor-pointer"
                >
                  Tutup
                </button>

                {selectedItem.type === "event" && (
                  <button
                    onClick={() => {
                      handleOpenWaRegistration(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="px-5 py-2 bg-[#E4002B] hover:bg-[#C50025] text-white font-bold rounded-lg text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Daftar via WhatsApp</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
