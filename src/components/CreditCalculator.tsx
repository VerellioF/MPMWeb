"use client";

import React, { useState, useEffect } from "react";
import { Calculator, MessageSquare, CheckCircle2, Info } from "@/components/Icons";
import { MOTOR_CATALOG, MotorModel, DEALER_INFO, SALES_TEAM } from "@/data/motorData";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { useSiteData } from "@/context/SiteDataContext";

interface CreditCalculatorProps {
  selectedMotor?: MotorModel | null;
}

export default function CreditCalculator({ selectedMotor }: CreditCalculatorProps) {
  const { openWhatsAppModal } = useWhatsAppModal();
  const { data } = useSiteData();
  const motorCatalog = data?.motorCatalog || MOTOR_CATALOG;
  const salesTeam = data?.salesTeam || SALES_TEAM;

  const [motorId, setMotorId] = useState<string>(selectedMotor ? selectedMotor.id : motorCatalog[0].id);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [dpPercent, setDpPercent] = useState<number>(20);
  const [tenorMonths, setTenorMonths] = useState<number>(36);
  const [selectedSalesId, setSelectedSalesId] = useState<string>(salesTeam[0]?.id || "sales-1");

  useEffect(() => {
    if (selectedMotor) {
      setMotorId(selectedMotor.id);
      if (selectedMotor.variants && selectedMotor.variants.length > 0) {
        const matched = selectedMotor.variants.find((v) => v.name === selectedMotor.variant);
        setSelectedVariantId(matched ? matched.id : selectedMotor.variants[0].id);
      }
    }
  }, [selectedMotor]);

  const activeMotor = motorCatalog.find((m) => m.id === motorId) || motorCatalog[0];
  const activeSales = salesTeam.find((s) => s.id === selectedSalesId) || salesTeam[0] || SALES_TEAM[0];

  // If active motor changed and selectedVariantId doesn't belong to it, reset to first variant
  const activeVariant = (activeMotor.variants && activeMotor.variants.length > 0)
    ? activeMotor.variants.find((v) => v.id === selectedVariantId) || activeMotor.variants[0]
    : {
        id: activeMotor.id,
        name: activeMotor.variant || "Standard",
        priceOTR: activeMotor.priceOTR,
        dpPromo: activeMotor.dpPromo,
        angsuranMulai: activeMotor.angsuranMulai,
        colors: [],
      };

  // Calculation Logic (Standard automotive leasing formula in Indonesia)
  const priceOTR = activeVariant.priceOTR;
  const dpAmount = Math.round((priceOTR * dpPercent) / 100);
  const loanPrincipal = priceOTR - dpAmount;

  // Monthly interest factor flat equivalent ~1.5%
  const monthlyInterestRate = 0.015;
  const totalInterest = loanPrincipal * monthlyInterestRate * tenorMonths;
  const totalLoan = loanPrincipal + totalInterest;
  const monthlyInstallment = Math.round(totalLoan / tenorMonths);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleOpenWaModal = () => {
    openWhatsAppModal({
      motorName: activeMotor.name,
      variantName: activeVariant.name,
      colorName: activeVariant.colors[0]?.name,
      priceOTR: priceOTR,
      motorImage: activeVariant.image || activeMotor.image,
      purchaseMethod: "kredit",
      dpAmount: dpAmount,
      tenorMonths: tenorMonths,
      monthlyInstallment: monthlyInstallment,
      defaultSalesId: selectedSalesId,
    });
  };

  const tenorOptions = [12, 24, 36];

  return (
    <section id="simulasi" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#E4002B] uppercase tracking-wider block">
            Simulasi Pembiayaan Kredit Resmi
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hitung Estimasi Angsuran & DP Motor Honda
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Rencanakan pembiayaan motor baru Anda secara transparan. Tentukan besaran uang muka dan pilihan tenor 12, 24, atau 36 bulan dengan suku bunga resmi rekanan leasing Astra terdaftar OJK.
          </p>
        </div>

        {/* 3-Step Financing Workflow Infographic */}
        <div className="mb-12 bg-gradient-to-r from-slate-50 via-red-50/30 to-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {/* Step 1 */}
            <div className="flex items-start gap-3.5 bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/70 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#E4002B] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                01
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Pilih Unit & Varian
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Pilih model Honda impian Anda dengan katalog lengkap dan harga OTR Blitar resmi.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5 bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/70 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                02
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Atur DP & Tenor Kredit
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Sesuaikan uang muka (10% - 50%) dan pilihan tenor fleksibel 12, 24, atau 36 bulan.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5 bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-slate-200/70 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                03
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  ACC & Motor Dikirim
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Dibantu sales counter sampai disetujui, unit dikirim gratis langsung ke rumah Anda.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* 1. Pilih Model Motor */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Pilih Model Motor Honda ({motorCatalog.length} Model)
              </label>
              <select
                value={motorId}
                onChange={(e) => {
                  setMotorId(e.target.value);
                  const newMotor = motorCatalog.find((m) => m.id === e.target.value);
                  if (newMotor && newMotor.variants && newMotor.variants.length > 0) {
                    setSelectedVariantId(newMotor.variants[0].id);
                  }
                }}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm font-semibold focus:outline-none focus:border-[#E4002B] transition"
              >
                {motorCatalog.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} — Mulai OTR {formatIDR(m.priceOTR)}
                  </option>
                ))}
              </select>
            </div>

            {/* 1b. Pilih Tipe / Varian Motor */}
            {activeMotor.variants && activeMotor.variants.length > 1 && (
              <div className="space-y-2 bg-white p-3.5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Pilih Tipe / Varian:</span>
                  <span className="font-bold text-[#E4002B]">{activeVariant.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeMotor.variants.map((v) => {
                    const isSelected = activeVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border cursor-pointer ${
                          isSelected
                            ? "bg-[#E4002B] text-white border-[#E4002B] shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span>{v.name}</span>
                        <span className="opacity-80 ml-1.5 text-[11px] font-normal">
                          ({formatIDR(v.priceOTR)})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Slider Uang Muka (DP) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  2. Rencana Uang Muka (DP)
                </label>
                <div className="text-right">
                  <span className="text-sm font-black text-[#E4002B]">{dpPercent}%</span>
                  <span className="text-xs text-slate-500 ml-1.5 font-bold">({formatIDR(dpAmount)})</span>
                </div>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={dpPercent}
                onChange={(e) => setDpPercent(Number(e.target.value))}
                className="w-full accent-[#E4002B] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                <span>10% (DP Ringan)</span>
                <span>20% (Rekomendasi)</span>
                <span>30%</span>
                <span>50%</span>
              </div>
            </div>

            {/* 3. Pilihan Tenor Angsuran */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                3. Jangka Waktu Kredit (Tenor)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {tenorOptions.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenorMonths(t)}
                    className={`py-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      tenorMonths === t
                        ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs ring-2 ring-[#0F172A]/20"
                        : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {t} Bulan
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Pilih Sales Pendamping */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                4. Pilih Konsultan Sales Pendamping
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {salesTeam.map((sales) => (
                  <button
                    key={sales.id}
                    type="button"
                    onClick={() => setSelectedSalesId(sales.id)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition ${
                      selectedSalesId === sales.id
                        ? "bg-red-50/50 border-[#E4002B] ring-1 ring-[#E4002B]"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={sales.avatar}
                      alt={sales.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 block truncate">{sales.name}</span>
                      <span className="text-[10px] text-slate-500 block truncate">{sales.role}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
            
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <img
                src={activeVariant.image || activeMotor.image}
                alt={activeMotor.name}
                className="w-24 h-16 object-contain"
              />
              <div>
                <span className="text-xs font-semibold text-slate-400 block">Unit Terpilih:</span>
                <h4 className="text-base font-black text-slate-900 leading-tight">
                  {activeMotor.name}
                </h4>
                <span className="text-xs font-bold text-[#E4002B]">
                  Tipe: {activeVariant.name}
                </span>
              </div>
            </div>

            {/* Calculation Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 text-slate-600">
                <span>Harga OTR Blitar</span>
                <span className="font-bold text-slate-900">{formatIDR(priceOTR)}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span>Rencana Uang Muka ({dpPercent}%)</span>
                <span className="font-bold text-slate-900">{formatIDR(dpAmount)}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span>Pokok Pembiayaan Kredit</span>
                <span className="font-bold text-slate-900">{formatIDR(loanPrincipal)}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span>Tenor Angsuran</span>
                <span className="font-bold text-slate-900">{tenorMonths} Bulan</span>
              </div>
            </div>

            {/* Big Installment Highlight Box */}
            <div className="bg-[#0F172A] text-white p-5 rounded-xl space-y-1">
              <span className="text-[11px] text-slate-300 uppercase tracking-wider block">
                Estimasi Cicilan Bulanan:
              </span>
              <div className="text-3xl font-black text-emerald-400 tracking-tight">
                {formatIDR(monthlyInstallment)}
                <span className="text-xs font-normal text-slate-300 ml-1">/ bulan</span>
              </div>
              <p className="text-[10px] text-slate-400 pt-1">
                *Simulasi sudah termasuk asuransi TLO & administrasi. Angka dapat disesuaikan promo dealer.
              </p>
            </div>

            {/* Selected Sales Rep Card */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <img
                src={activeSales.avatar}
                alt={activeSales.name}
                className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 block">Konsultan yang menangani:</span>
                <span className="font-bold text-slate-900 block truncate">{activeSales.name}</span>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Siap bantu hitungan & promo DP
                </span>
              </div>
            </div>

            {/* One-click WhatsApp CTA */}
            <button
              type="button"
              onClick={handleOpenWaModal}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold tracking-wide transition shadow-md hover:shadow-lg cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Kirim Hasil Simulasi ke WhatsApp Sales</span>
            </button>

            {/* Official Leasing Guarantee Ribbon */}
            <div className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold uppercase tracking-wider text-slate-500">
                  Lembaga Pembiayaan Resmi
                </span>
                <span className="font-bold text-[#E4002B] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Diawasi OJK
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {["FIFGROUP", "ADIRA", "BCA FINANCE", "OTO KREDIT"].map((partner) => (
                  <span
                    key={partner}
                    className="px-2 py-0.5 rounded text-[9px] font-black bg-white border border-slate-200 text-slate-700 shadow-2xs"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="flex items-start gap-2 text-[11px] text-slate-500">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Simulasi ini bersifat estimasi. Silakan hubungi tim sales kami untuk promo cashback diskon DP hingga jutaan rupiah dan bunga khusus PNS/BUMN/Karyawan Swasta di Blitar.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
