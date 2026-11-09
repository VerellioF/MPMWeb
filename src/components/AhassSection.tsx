"use client";

import React from "react";
import { Wrench, ShieldCheck, Clock, CheckCircle2, MessageSquare, Award, ArrowRight, PlayStoreIcon, AppStoreIcon } from "@/components/Icons";
import { DEALER_INFO } from "@/data/motorData";

export default function AhassSection() {
  return (
    <section id="ahass" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#E4002B] uppercase tracking-wider block">
            Bengkel Resmi & Purna Jual Honda
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Perawatan Berkala Terbaik di AHASS MPM Motor Blitar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Jaga performa dan keawetan motor Honda Anda bersama teknisi tersertifikasi Astra Honda Motor. Menggunakan peralatan diagnostic komputerisasi presisi serta jaminan 100% suku cadang asli HGP dan pelumas AHM Oil.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: AHASS Service Highlights */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-slate-200/90 hover:border-red-200 p-5 rounded-2xl space-y-2.5 shadow-2xs hover:shadow-xs transition">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E4002B] flex items-center justify-center font-black">
                  <Wrench className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900">Pit Express 15 Menit</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Bebas Antre
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Layanan jalur cepat khusus penggantian AHM Oil, busi, kampas rem, dan aki tanpa perlu menunggu antrean servis berkala panjang.
                </p>
              </div>

              <div className="bg-white border border-slate-200/90 hover:border-red-200 p-5 rounded-2xl space-y-2.5 shadow-2xs hover:shadow-xs transition">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E4002B] flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900">Hi-DS Diagnostic Tool</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Komputerisasi
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pemindaian sistem injeksi PGM-FI dengan scanner digital resmi Honda Jepang untuk memastikan performa mesin selalu optimal dan irit.
                </p>
              </div>

              <div className="bg-white border border-slate-200/90 hover:border-red-200 p-5 rounded-2xl space-y-2.5 shadow-2xs hover:shadow-xs transition">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E4002B] flex items-center justify-center font-black">
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900">100% Suku Cadang Asli HGP</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                    Garansi Astra
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Jaminan keaslian seluruh komponen suku cadang Honda Genuine Parts dan pelumas mesin AHM Oil berbarcode resmi PT Astra Honda Motor.
                </p>
              </div>

              <div className="bg-white border border-slate-200/90 hover:border-red-200 p-5 rounded-2xl space-y-2.5 shadow-2xs hover:shadow-xs transition">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E4002B] flex items-center justify-center font-black">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900">Servis Kunjung & Darurat</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    Home Service
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Mekanik bersertifikasi kami dapat datang langsung ke rumah atau kantor Anda di area Kota & Kab. Blitar untuk perawatan berkala.
                </p>
              </div>
            </div>

            {/* Operating Info Box & Facility Perks Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3 shadow-sm">
              <div className="space-y-0.5">
                <span className="text-slate-400 block font-semibold text-[11px] uppercase tracking-wider">
                  Jam Buka Bengkel AHASS Blitar:
                </span>
                <span className="text-white font-bold text-sm">{DEALER_INFO.hoursBengkel}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300 font-bold bg-white/10 px-3 py-2 rounded-xl backdrop-blur-xs border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ruang Tunggu AC • Free Wi-Fi • Kopi Gratis</span>
              </div>
            </div>

          </div>

          {/* Right Column: BromPit Official Booking App Portal */}
          <div className="lg:col-span-5 bg-white border-2 border-red-100 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm relative">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={DEALER_INFO.logos.brompit}
                  alt="Aplikasi BromPit Resmi MPM Honda Jatim"
                  className="h-11 w-11 rounded-xl object-contain shadow-xs border border-slate-100 shrink-0"
                />
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight">
                    Booking Servis via BromPit
                  </h3>
                  <span className="text-[11px] font-bold text-[#E4002B]">
                    Aplikasi Resmi MPM Honda Jawa Timur
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Bebas Antre
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Untuk kenyamanan servis tanpa antrean lama di showroom Jl. S. Supriadi, kami menyarankan booking jadwal perawatan berkala melalui aplikasi resmi <strong>BromPit</strong>. Dapatkan nomor antrean prioritas, kepastian jam mekanik, riwayat servis berkala, serta poin reward loyalty dari MPM Honda Jatim.
            </p>

            {/* Step by Step Booking Guide */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block text-xs">Cara Booking Servis Cepat:</span>
              
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E4002B] text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <span>Unduh aplikasi <strong>BromPit</strong> di smartphone Anda dan daftarkan motor Honda Anda.</span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E4002B] text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <span>Pilih menu <strong>Booking Service</strong> dan cari bengkel: <strong>MPM Motor Blitar (Jl. S. Supriadi No. 79)</strong>.</span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E4002B] text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                <span>Pilih tanggal, jam, dan keluhan servis. Datang tepat waktu dan langsung dilayani pit mekanik!</span>
              </div>
            </div>

            {/* Live BromPit Antrean Simulation Ticket Widget */}
            <div className="bg-slate-900 text-white p-3.5 rounded-xl border border-slate-800 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Tiket Antrean Prioritas BromPit
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-black border border-emerald-500/30">
                  AKSES CEPAT
                </span>
              </div>
              <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-lg border border-white/5">
                <div>
                  <span className="text-[10px] text-slate-400 block">Lokasi Servis</span>
                  <span className="text-xs font-bold text-white">AHASS MPM Blitar (Pit Express 2)</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Estimasi Servis</span>
                  <span className="text-xs font-black text-amber-400">15 - 30 Menit</span>
                </div>
              </div>
            </div>

            {/* Download App Buttons */}
            <div className="space-y-2.5 pt-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Unduh Aplikasi BromPit Sekarang:
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={DEALER_INFO.brompitUrls.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl bg-[#0F172A] hover:bg-black text-white transition shadow-sm border border-slate-800 group"
                >
                  <PlayStoreIcon className="w-6 h-6 shrink-0 group-hover:scale-105 transition-transform" />
                  <div className="text-left">
                    <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider leading-none">
                      Temukan di
                    </span>
                    <span className="text-xs font-black text-white leading-tight">
                      Google Play
                    </span>
                  </div>
                </a>

                <a
                  href={DEALER_INFO.brompitUrls.appStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl bg-[#0F172A] hover:bg-black text-white transition shadow-sm border border-slate-800 group"
                >
                  <AppStoreIcon className="w-6 h-6 shrink-0 text-white group-hover:scale-105 transition-transform" />
                  <div className="text-left">
                    <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider leading-none">
                      Unduh di
                    </span>
                    <span className="text-xs font-black text-white leading-tight">
                      App Store
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Emergency / Manual Question to AHASS Admin */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Butuh bantuan instalasi BromPit?</span>
              <a
                href={`https://wa.me/${DEALER_INFO.whatsappAhass}?text=Halo%20Admin%20AHASS%20MPM%20Motor%20Blitar,%20saya%20butuh%20panduan%20booking%20servis%20di%20aplikasi%20BromPit`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#E4002B] hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Admin AHASS</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
