"use client";

import React, { useState } from "react";
import { Phone, MapPin, Clock, MessageSquare, Menu, X, ChevronRight } from "@/components/Icons";
import { HondaLogo, MpmLogo } from "@/components/Logos";
import { DEALER_INFO, SALES_TEAM, MOTOR_CATALOG } from "@/data/motorData";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { useSiteData } from "@/context/SiteDataContext";

export default function Navbar() {
  const { openWhatsAppModal } = useWhatsAppModal();
  const { data } = useSiteData();
  const dealerInfo = data?.dealerInfo || DEALER_INFO;
  const salesTeam = data?.salesTeam || SALES_TEAM;
  const motorCount = data?.motorCatalog?.length || MOTOR_CATALOG.length;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [salesDropdownOpen, setSalesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs bg-white">
      {/* Top Utility Ribbon (Automotive Dealership Bar) */}
      <div className="hidden lg:block bg-[#0F172A] text-slate-300 py-2 text-xs border-b border-slate-800">
        <div className="max-w-7xl xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#E4002B] shrink-0" />
              <span className="truncate">{dealerInfo.address}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-[#E4002B] shrink-0" />
              <span>{dealerInfo.hoursShowroom}</span>
            </div>
          </div>
          <div className="flex items-center gap-5 whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Showroom Buka Hari Ini
            </span>
            <div className="flex items-center gap-2.5">
              <span className="text-slate-400 text-[11px]">Pilih Konsultan Sales:</span>
              <div className="flex items-center gap-1.5">
                {salesTeam.slice(0, 3).map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => openWhatsAppModal({ defaultSalesId: s.id })}
                    className="hover:text-white transition flex items-center gap-1 text-[11px] font-bold text-slate-200 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{s.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dealership Navigation with Official Honda & MPM Logos */}
      <div className="border-b border-slate-200/90 bg-white">
        <div className="max-w-7xl xl:max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4 xl:gap-8">
            
            {/* Dealer Logo with Real Honda & MPM Official Logos */}
            <a href="#" className="flex items-center gap-2 sm:gap-3.5 min-w-0 max-w-[calc(100%-54px)] sm:max-w-none group py-1">
              <div className="h-8 sm:h-10 flex items-center gap-2 sm:gap-3 shrink-0">
                <HondaLogo className="h-7 sm:h-9 w-auto text-[#E4002B] drop-shadow-xs group-hover:scale-105 transition-transform shrink-0" />
                <div className="h-5 sm:h-6 w-px bg-slate-200 shrink-0"></div>
                <MpmLogo className="h-5 sm:h-7.5 w-auto object-contain group-hover:opacity-90 transition-opacity shrink-0" />
              </div>
              <div className="border-l border-slate-200 pl-2 sm:pl-3.5 min-w-0">
                <span className="text-xs sm:text-base font-black tracking-tight text-slate-900 uppercase block truncate leading-none">
                  MPM Motor <span className="text-[#E4002B]">Blitar</span>
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate block mt-1 leading-none">
                  <span className="hidden sm:inline">Jl. S. Supriadi No. 79 • </span>AHASS 00109
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-bold text-slate-700 whitespace-nowrap">
              <a href="#katalog" className="hover:text-[#E4002B] transition-colors py-2 whitespace-nowrap">
                Katalog Motor
              </a>
              <a href="#simulasi" className="hover:text-[#E4002B] transition-colors py-2 whitespace-nowrap">
                Simulasi Kredit
              </a>
              <a href="#sales" className="hover:text-[#E4002B] transition-colors py-2 whitespace-nowrap">
                Tim Sales
              </a>
              <a href="#ahass" className="hover:text-[#E4002B] transition-colors py-2 whitespace-nowrap">
                Servis AHASS
              </a>
              <a href="#promo" className="hover:text-[#E4002B] transition-colors py-2 whitespace-nowrap">
                Promo Dealer
              </a>
              <a href="#event-berita" className="hover:text-[#E4002B] transition-colors py-2 whitespace-nowrap">
                Event & Berita
              </a>
              <a href="#lokasi" className="hover:text-[#E4002B] transition-colors py-2 whitespace-nowrap">
                Lokasi
              </a>
            </nav>

            {/* Right Action: Sales Selection Dropdown */}
            <div className="hidden sm:flex items-center shrink-0">
              <div className="relative">
                <button
                  onClick={() => setSalesDropdownOpen(!salesDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 lg:px-4 lg:py-2.5 rounded-lg bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold tracking-wide transition shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Pilih Sales Kami</span>
                  <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-0.5">
                    {salesTeam.length}
                  </span>
                </button>

                {/* Dropdown Menu for Sales Team */}
                {salesDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 space-y-1.5">
                    <div className="px-2 py-1 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Konsultan Sales Siap Melayani
                    </div>
                    {salesTeam.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setSalesDropdownOpen(false);
                          openWhatsAppModal({ defaultSalesId: s.id });
                        }}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition border border-transparent hover:border-slate-100 text-left cursor-pointer"
                      >
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 truncate">{s.name}</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          </div>
                          <span className="text-[10px] text-slate-500 block truncate">{s.role}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile / Tablet Menu Toggle */}
            <div className="lg:hidden flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center transition shadow-2xs cursor-pointer"
                aria-label={mobileMenuOpen ? "Tutup Menu" : "Buka Menu"}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2 text-xs font-bold text-slate-700">
            <a
              href="#katalog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70"
            >
              <span>Katalog Motor Honda ({motorCount} Model)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#simulasi"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70"
            >
              <span>Kalkulator Simulasi Kredit</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#sales"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70"
            >
              <span>Konsultan Sales Resmi ({salesTeam.length})</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#ahass"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70"
            >
              <span>Booking Servis AHASS (BromPit)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#promo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70"
            >
              <span>Promo Kredit & Subsidi DP</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#event-berita"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70"
            >
              <span>Agenda Showroom & Berita</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#lokasi"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70"
            >
              <span>Lokasi & Jam Buka Showroom</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </nav>
          
          {/* Quick Sales Hotline for Mobile */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider block">
              Konsultasi WhatsApp Langsung:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {salesTeam.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWhatsAppModal({ defaultSalesId: s.id });
                  }}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-100 text-left cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span className="truncate">{s.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsAppModal();
              }}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-black tracking-wide flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat Sales Showroom Blitar</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
