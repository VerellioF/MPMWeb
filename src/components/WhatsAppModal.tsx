"use client";

import React, { useState, useEffect } from "react";
import { X, MessageSquare, Check, Wallet, CreditCard, CheckCircle2, ShieldCheck } from "@/components/Icons";
import { SALES_TEAM, DEALER_INFO, SalesConsultant } from "@/data/motorData";

export interface WhatsAppModalData {
  motorName?: string;
  variantName?: string;
  colorName?: string;
  priceOTR?: number;
  motorImage?: string;
  purchaseMethod?: "cash" | "kredit";
  dpAmount?: number;
  tenorMonths?: number;
  monthlyInstallment?: number;
  defaultSalesId?: string;
  notes?: string;
}

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<WhatsAppModalData>;
}

export default function WhatsAppModal({ isOpen, onClose, initialData = {} }: WhatsAppModalProps) {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [district, setDistrict] = useState("Kec. Sananwetan");
  const [purchaseMethod, setPurchaseMethod] = useState<"cash" | "kredit">("kredit");
  const [tenorMonths, setTenorMonths] = useState<number>(36);
  const [selectedSalesId, setSelectedSalesId] = useState<string>(SALES_TEAM[0].id);
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (initialData.purchaseMethod) setPurchaseMethod(initialData.purchaseMethod);
      if (initialData.tenorMonths) setTenorMonths(initialData.tenorMonths);
      if (initialData.defaultSalesId) setSelectedSalesId(initialData.defaultSalesId);
      setErrorMessage("");
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const activeSales = SALES_TEAM.find((s) => s.id === selectedSalesId) || SALES_TEAM[0];

  const formatIDR = (val?: number) => {
    if (!val) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const blitarDistricts = [
    "Kec. Sananwetan (Kota)",
    "Kec. Kepanjenkidul (Kota)",
    "Kec. Sukorejo (Kota)",
    "Kec. Kanigoro (Kabupaten)",
    "Kec. Garum",
    "Kec. Nglegok",
    "Kec. Wlingi",
    "Kec. Talun",
    "Kec. Srengat",
    "Kec. Kademangan",
    "Kec. Sutojayan / Lodoyo",
    "Wilayah Lain di Blitar Sekitarnya",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage("Silakan isi nama lengkap Anda.");
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 9) {
      setErrorMessage("Silakan isi nomor WhatsApp aktif Anda (minimal 9 digit).");
      return;
    }

    // Build the official WhatsApp consultation message
    let message = `Halo Kak ${activeSales.name} (Sales MPM Motor Blitar),\n\n`;
    message += `Perkenalkan saya ingin konsultasi pembelian motor Honda:\n`;
    message += `👤 *Nama*: ${fullName.trim()}\n`;
    message += `📱 *No. WhatsApp*: ${phoneNumber.trim()}\n`;
    message += `📍 *Domisili*: ${district}\n\n`;

    if (initialData.motorName) {
      message += `🏍️ *Unit Diminati*: ${initialData.motorName}\n`;
      if (initialData.variantName) message += `🔖 *Tipe / Varian*: ${initialData.variantName}\n`;
      if (initialData.colorName) message += `🎨 *Pilihan Warna*: ${initialData.colorName}\n`;
      if (initialData.priceOTR) message += `💰 *Harga OTR Blitar*: ${formatIDR(initialData.priceOTR)}\n`;
    }

    message += `\n💳 *Rencana Pembelian*: ${purchaseMethod === "cash" ? "CASH (TUNAI)" : "KREDIT"}\n`;

    if (purchaseMethod === "kredit") {
      message += `📅 *Rencana Tenor*: ${tenorMonths} Bulan\n`;
      if (initialData.dpAmount) message += `💵 *Rencana DP*: ${formatIDR(initialData.dpAmount)}\n`;
      if (initialData.monthlyInstallment) {
        message += `📊 *Estimasi Cicilan*: ${formatIDR(initialData.monthlyInstallment)} / bulan\n`;
      }
    } else {
      message += `🎁 *Kebutuhan*: Mohon info promo diskon cash, ketersediaan unit, & bonus aksesoris resmi.\n`;
    }

    if (notes.trim()) {
      message += `📝 *Catatan Khusus*: ${notes.trim()}\n`;
    }

    message += `\nMohon info stok di showroom MPM Motor Blitar Jl. S. Supriadi No. 79. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${activeSales.whatsapp}?text=${encoded}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative bg-[#0F172A] text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-md shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">MPM Motor Blitar</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Resmi Honda
                </span>
              </div>
              <h3 className="text-lg font-black tracking-tight text-white">
                Formulir Konsultasi Pembelian
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
            aria-label="Tutup popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Selected Motorcycle Summary Card */}
          {initialData.motorName && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center gap-4">
              {initialData.motorImage ? (
                <div className="w-20 h-16 bg-white rounded-xl border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={initialData.motorImage}
                    alt={initialData.motorName}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>
              ) : null}
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">
                  Unit Pilihan Anda
                </span>
                <h4 className="text-sm font-black text-slate-900 truncate">
                  {initialData.motorName}
                </h4>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs mt-0.5">
                  {initialData.variantName && (
                    <span className="font-bold text-[#E4002B]">
                      Tipe: {initialData.variantName}
                    </span>
                  )}
                  {initialData.colorName && (
                    <span className="text-slate-500">
                      • {initialData.colorName}
                    </span>
                  )}
                  {initialData.priceOTR && (
                    <span className="font-bold text-slate-900 ml-auto">
                      {formatIDR(initialData.priceOTR)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form id="wa-form" onSubmit={handleSubmit} className="space-y-4">
            
            {/* Purchase Method Selection: Cash vs Kredit */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Rencana Pembelian <span className="text-[#E4002B]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPurchaseMethod("cash")}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                    purchaseMethod === "cash"
                      ? "bg-red-50/40 border-[#E4002B] ring-2 ring-[#E4002B]/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    purchaseMethod === "cash" ? "bg-[#E4002B] text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-900">Cash (Tunai)</span>
                      {purchaseMethod === "cash" && <Check className="w-3.5 h-3.5 text-[#E4002B]" />}
                    </div>
                    <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
                      Diskon OTR & proses cepat
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPurchaseMethod("kredit")}
                  className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                    purchaseMethod === "kredit"
                      ? "bg-red-50/40 border-[#E4002B] ring-2 ring-[#E4002B]/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    purchaseMethod === "kredit" ? "bg-[#E4002B] text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-900">Kredit (Cicilan)</span>
                      {purchaseMethod === "kredit" && <Check className="w-3.5 h-3.5 text-[#E4002B]" />}
                    </div>
                    <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
                      DP subsidi & bunga ringan
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Tenor Selection (Only shown when Kredit is selected) */}
            {purchaseMethod === "kredit" && (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Pilih Tenor Cicilan:</span>
                  <span className="font-black text-[#E4002B]">{tenorMonths} Bulan</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[12, 24, 36].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTenorMonths(t)}
                      className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        tenorMonths === t
                          ? "bg-[#0F172A] text-white border-[#0F172A] shadow-xs"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {t} Bulan
                    </button>
                  ))}
                </div>
                {initialData.monthlyInstallment && (
                  <div className="text-[11px] text-slate-500 pt-1 flex justify-between">
                    <span>Estimasi Angsuran:</span>
                    <span className="font-bold text-slate-800">
                      ~ {formatIDR(initialData.monthlyInstallment)} / bln
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Cash Info (Only shown when Cash is selected) */}
            {purchaseMethod === "cash" && (
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-800 space-y-1 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Keuntungan Pembelian Cash di MPM Motor Blitar:</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Bonus helm SNI resmi Honda, jaket eksklusif, buku servis berkala 1 tahun gratis di bengkel AHASS, plat nomor & STNK resmi diantar ke alamat Anda.
                </p>
              </div>
            )}

            {/* Full Name & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Anda <span className="text-[#E4002B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E4002B] focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp Aktif <span className="text-[#E4002B]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Contoh: 0812-3456-7890"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E4002B] focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Domisili / Kecamatan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Domisili Kecamatan di Blitar
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E4002B] bg-white transition"
              >
                {blitarDistricts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Pilih Konsultan Sales Pendamping */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Pilih Konsultan Sales Pendamping
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SALES_TEAM.map((sales) => {
                  const isSelected = selectedSalesId === sales.id;
                  return (
                    <button
                      key={sales.id}
                      type="button"
                      onClick={() => setSelectedSalesId(sales.id)}
                      className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center cursor-pointer ${
                        isSelected
                          ? "bg-red-50/50 border-[#E4002B] ring-2 ring-[#E4002B]/20"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="relative mb-1">
                        <img
                          src={sales.avatar}
                          alt={sales.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-900 truncate w-full block">
                        {sales.name.split(" ")[0]}
                      </span>
                      <span className="text-[9px] text-slate-500 truncate w-full block">
                        {sales.role.replace("Consultant", "").replace("Executive", "")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Catatan / Pertanyaan Tambahan (Opsional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: Mau tukar tambah motor Vario lama / Jadwal survei"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#E4002B] transition"
              />
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                {errorMessage}
              </div>
            )}

            {/* Security Assurance */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Data Anda aman dan diteruskan langsung ke Sales Resmi MPM Blitar.</span>
            </div>

          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 shrink-0 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            form="wa-form"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition shadow-md hover:shadow-lg cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Kirim Pesan ke WhatsApp (Kak {activeSales.name.split(" ")[0]})</span>
          </button>
        </div>

      </div>
    </div>
  );
}
