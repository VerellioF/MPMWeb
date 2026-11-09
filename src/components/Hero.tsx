import React from "react";
import { ShieldCheck, Award, ArrowRight, Calculator, CheckCircle2, Sparkles } from "@/components/Icons";
import { DEALER_INFO } from "@/data/motorData";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white border-b border-slate-200/80 pt-10 pb-16 lg:pt-16 lg:pb-20">
      
      {/* Background Architectural Grid & Dynamic Automotive Watermark */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f050_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f050_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Decorative Automotive Speed Lines & Honda Wing Silhouette */}
      <div className="absolute -top-12 -right-12 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-slate-300/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Honda Wing Abstract Background Silhouette */}
      <div className="absolute right-0 top-10 w-full max-w-xl h-full opacity-[0.035] pointer-events-none select-none flex items-center justify-end overflow-hidden">
        <svg viewBox="0 0 1000 800" className="w-[800px] h-auto fill-red-600">
          <path d="M100,500 C300,450 600,300 900,100 C750,250 500,400 300,550 Z" />
          <path d="M150,550 C350,500 650,350 950,150 C800,300 550,450 350,600 Z" />
          <path d="M200,600 C400,550 700,400 1000,200 C850,350 600,500 400,650 Z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid: Left Copy & Right Featured Motor Showroom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Dealer Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-50/90 border border-red-200/80 text-xs font-bold text-[#E4002B] shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E4002B] animate-pulse"></span>
              <span>Dealer Resmi Sepeda Motor Honda & AHASS Blitar</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="hidden sm:inline text-slate-700 font-bold">One HEART.</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Beli Motor Honda Baru di Blitar Jadi Lebih Mudah, Cepat & Transparan
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              Dapatkan promo uang muka ringan, angsuran fleksibel hingga 36 bulan, garansi rangka resmi 5 tahun, dan layanan antar unit gratis se-Blitar Raya. Hubungi tim sales kami atau kunjungi showroom di Jl. S. Supriadi No. 79, Kota Blitar.
            </p>

            {/* Key Value Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-white/90 backdrop-blur-xs border border-slate-200/90 p-3.5 rounded-2xl shadow-2xs hover:border-red-200 hover:shadow-xs transition">
                <ShieldCheck className="w-5 h-5 text-[#E4002B] mb-1.5" />
                <span className="block text-xs font-bold text-slate-900">Garansi Rangka</span>
                <span className="text-[11px] text-slate-500">Resmi 5 Tahun</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs border border-slate-200/90 p-3.5 rounded-2xl shadow-2xs hover:border-red-200 hover:shadow-xs transition">
                <Award className="w-5 h-5 text-[#E4002B] mb-1.5" />
                <span className="block text-xs font-bold text-slate-900">Gratis Servis</span>
                <span className="text-[11px] text-slate-500">4x Servis + 1x Oli Asli</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs border border-slate-200/90 p-3.5 rounded-2xl shadow-2xs hover:border-red-200 hover:shadow-xs transition">
                <CheckCircle2 className="w-5 h-5 text-[#E4002B] mb-1.5" />
                <span className="block text-xs font-bold text-slate-900">Kredit Cepat ACC</span>
                <span className="text-[11px] text-slate-500">Dibantu Sampai Tuntas</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs border border-slate-200/90 p-3.5 rounded-2xl shadow-2xs hover:border-red-200 hover:shadow-xs transition">
                <ShieldCheck className="w-5 h-5 text-[#E4002B] mb-1.5" />
                <span className="block text-xs font-bold text-slate-900">STNK & BPKB</span>
                <span className="text-[11px] text-slate-500">Plat AG Blitar Resmi</span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#katalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#E4002B] hover:bg-[#C50025] text-white font-black text-sm tracking-wide shadow-md shadow-red-500/20 transition active:scale-95"
              >
                <span>Lihat Katalog Motor Ready</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#simulasi"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-sm transition shadow-2xs"
              >
                <Calculator className="w-4 h-4 text-[#E4002B]" />
                <span>Hitung Simulasi Cicilan</span>
              </a>
            </div>
          </div>

          {/* Right Column: Featured Flagship Motorcycle Card with Showroom Studio Podium */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-50 to-white p-6 sm:p-7 border border-slate-200/90 shadow-xl overflow-hidden group">
              
              {/* Subtle Speed Badge */}
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-[#E4002B] text-white shadow-xs">
                  Pilihan Utama Showroom
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Ready Stock Blitar
                </span>
              </div>

              {/* Showroom Studio Podium with Grounding Radial Shadow */}
              <div className="relative h-64 sm:h-72 flex items-center justify-center py-4">
                
                {/* Radial Glow & Showroom Floor Reflection */}
                <div className="absolute inset-x-8 bottom-4 h-10 bg-slate-950/15 rounded-[100%] blur-md -z-0 transform scale-y-50"></div>
                <div className="absolute inset-x-16 bottom-5 h-4 bg-slate-900/25 rounded-[100%] blur-xs -z-0 transform scale-y-40"></div>

                <img
                  src="https://www.mpmhondajatim.com/assets/uploads/files/produk_foto/Sub_pcx.png"
                  alt="All New Honda PCX 160 MPM Motor Blitar"
                  className="max-h-full max-w-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-300 relative z-10"
                />
              </div>

              {/* Title & Tagline */}
              <div className="border-t border-slate-200/80 pt-4 space-y-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">All New Honda PCX 160</h3>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">160 cc eSP+ 4-Katup</span>
                </div>
                <p className="text-xs text-slate-500">
                  Skutik besar mewah dengan kontrol traksi HSTC, Honda Smart Key, dan bagasi luas 30 liter.
                </p>
              </div>

              {/* Pricing & CTA */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Harga OTR Kota Blitar</span>
                  <span className="text-2xl font-black text-[#E4002B] font-mono">Rp 37.350.000</span>
                </div>
                <a
                  href={`https://wa.me/${DEALER_INFO.whatsappSales}?text=Halo%20MPM%20Motor%20Blitar,%20saya%20tertarik%20dengan%20All%20New%20PCX%20160`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-black transition shadow-md shadow-red-500/20 active:scale-95"
                >
                  Tanya Promo Ini
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* LEASING & FINANCING PARTNER LOGO BAR (CREDIBILITY STRIP)      */}
        {/* ------------------------------------------------------------- */}
        <div className="pt-6 border-t border-slate-200/80">
          <div className="bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2.5 text-center md:text-left">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                Mitra Pembiayaan Resmi & Terpercaya:
              </span>
            </div>

            {/* Partner Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-slate-700 text-xs font-black">
              
              {/* FIFGROUP */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span className="tracking-tight text-slate-900">FIFGROUP</span>
                <span className="text-[10px] text-slate-400 font-medium">(Astra)</span>
              </div>

              {/* ADIRA FINANCE */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="tracking-tight text-slate-900">ADIRA Finance</span>
              </div>

              {/* OTO MULTIARTHA */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <span className="tracking-tight text-slate-900">OTO Kredit Motor</span>
              </div>

              {/* BCA MULTI FINANCE */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span>
                <span className="tracking-tight text-slate-900">BCA Multi Finance</span>
              </div>

              {/* OJK COMPLIANCE STAMP */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-[#E4002B]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#E4002B]" />
                <span className="text-[11px] font-bold">Terdaftar & Diawasi OJK</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
