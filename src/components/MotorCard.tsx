"use client";

import React, { useState } from "react";
import { Gauge, Fuel, Zap, Settings, MessageSquare, Calculator, Check } from "@/components/Icons";
import { MotorModel, MotorVariant, ColorOption, DEALER_INFO } from "@/data/motorData";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";

interface MotorCardProps {
  motor: MotorModel;
  onSelectForSimulation: (motor: MotorModel) => void;
}

export default function MotorCard({ motor, onSelectForSimulation }: MotorCardProps) {
  const { openWhatsAppModal } = useWhatsAppModal();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number | null>(null);

  const activeVariant: MotorVariant = motor.variants && motor.variants.length > 0
    ? motor.variants[selectedVariantIdx] || motor.variants[0]
    : {
        id: motor.id,
        name: motor.variant || "Standard",
        priceOTR: motor.priceOTR,
        dpPromo: motor.dpPromo,
        angsuranMulai: motor.angsuranMulai,
        badge: motor.badge,
        colors: (motor.colors || []).map((c) => ({ name: c, hex: "#18181B" })),
      };

  const activeColor: ColorOption = activeVariant.colors && activeVariant.colors.length > 0
    ? activeVariant.colors[selectedColorIdx ?? 0] || activeVariant.colors[0]
    : { name: motor.colors[0] || "Standard", hex: "#18181B" };

  const displayedImage = (selectedColorIdx !== null && activeColor.image)
    ? activeColor.image
    : (activeVariant.image || motor.image);

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleVariantChange = (idx: number) => {
    setSelectedVariantIdx(idx);
    setSelectedColorIdx(null); // reset to uniform variant studio image
  };

  const handleOpenWaModal = () => {
    openWhatsAppModal({
      motorName: motor.name,
      variantName: activeVariant.name,
      colorName: activeColor.name,
      priceOTR: activeVariant.priceOTR,
      motorImage: displayedImage,
      dpAmount: activeVariant.dpPromo,
      purchaseMethod: "kredit",
    });
  };

  const handleSimulationClick = () => {
    // Pass custom variant price to the simulation calculator
    const customizedMotor: MotorModel = {
      ...motor,
      variant: activeVariant.name,
      priceOTR: activeVariant.priceOTR,
      dpPromo: activeVariant.dpPromo,
      angsuranMulai: activeVariant.angsuranMulai,
      colors: [activeColor.name],
    };
    onSelectForSimulation(customizedMotor);
  };

  const currentBadge = activeVariant.badge || motor.badge;

  return (
    <div className="group rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md">
      <div>
        {/* Card Header & Studio Vehicle Image */}
        <div className="relative h-60 w-full p-6 bg-gradient-to-b from-slate-50/80 via-white to-slate-100/40 flex items-center justify-center border-b border-slate-100 overflow-hidden">
          {/* Subtle Showroom Spotlight Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(228,0,43,0.04)_0%,rgba(248,250,252,0.6)_50%,transparent_80%)] pointer-events-none" />

          {/* Showroom Floor Reflection Line & Soft Contact Shadow under wheels */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-48 sm:w-56 h-3 bg-slate-900/15 rounded-[100%] blur-[4px] pointer-events-none z-0" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 sm:w-40 h-1.5 bg-slate-950/25 rounded-[100%] blur-[2px] pointer-events-none z-0" />

          <img
            key={displayedImage}
            src={displayedImage}
            alt={`${motor.name} ${activeVariant.name} - ${activeColor.name}`}
            className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-all duration-300 relative z-10 drop-shadow-xs"
          />

          {/* Badge */}
          {currentBadge && (
            <div className="absolute top-3 left-3 z-20">
              <span
                className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1 ${
                  currentBadge === "Best Seller"
                    ? "bg-[#E4002B] text-white"
                    : currentBadge === "Unit Baru"
                    ? "bg-blue-600 text-white"
                    : "bg-emerald-600 text-white"
                }`}
              >
                <span>★</span> {currentBadge}
              </span>
            </div>
          )}

          {/* Category Tag with Icon Accent */}
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-xs text-slate-800 border border-slate-200/90 shadow-2xs flex items-center gap-1">
              {motor.category === "matic" && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
              {motor.category === "sport" && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
              {motor.category === "cub" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
              {motor.category === "ev" && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>}
              <span>{motor.category.toUpperCase()}</span>
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4">
          
          {/* Title & Tagline */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug">
                {motor.name}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1 line-clamp-1">{motor.tagline}</p>
          </div>

          {/* Variant Selector Pills (Tipe/Varian: CBS, ABS, Street, Deluxe, dll) */}
          {motor.variants && motor.variants.length > 1 && (
            <div className="space-y-1.5 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-500">Pilih Tipe / Varian:</span>
                <span className="font-bold text-[#E4002B]">{activeVariant.name}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {motor.variants.map((variant, idx) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(idx)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition cursor-pointer border ${
                      selectedVariantIdx === idx
                        ? "bg-[#E4002B] text-white border-[#E4002B] shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Palette Swatches (Pilihan Warna) */}
          {activeVariant.colors && activeVariant.colors.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Pilihan Warna:</span>
                <span className="font-bold text-slate-800 truncate max-w-[170px]">
                  {selectedColorIdx !== null ? activeColor.name : "Standar MPM"}
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                {activeVariant.colors.map((color, idx) => {
                  const isSelected = selectedColorIdx === idx;
                  const isDualTone = Boolean(color.secondaryHex);
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIdx(selectedColorIdx === idx ? null : idx)}
                      title={color.name}
                      className={`relative w-6 h-6 rounded-full transition-transform cursor-pointer border border-slate-300 ${
                        isSelected
                          ? "ring-2 ring-offset-2 ring-[#E4002B] scale-110 shadow-xs"
                          : "hover:scale-105 opacity-80 hover:opacity-100"
                      }`}
                      style={{
                        background: isDualTone
                          ? `linear-gradient(135deg, ${color.hex} 50%, ${color.secondaryHex} 50%)`
                          : color.hex,
                      }}
                      aria-label={`Pilih warna ${color.name}`}
                    >
                      {isSelected && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className={`w-3 h-3 ${color.hex === "#FFFFFF" || color.hex === "#F8FAFC" ? "text-slate-900" : "text-white"}`} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-slate-100 bg-slate-50/50 -mx-5 px-5">
            <div className="flex items-center gap-2 text-slate-600">
              <Gauge className="w-3.5 h-3.5 text-[#E4002B] shrink-0" />
              <span className="truncate">{motor.engine}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Fuel className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{motor.fuelConsumption}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">{motor.fuelSystem}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Settings className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{motor.transmission}</span>
            </div>
          </div>

          {/* Price & DP Highlight */}
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">
                Harga OTR Blitar {motor.variants.length > 1 ? `(${activeVariant.name})` : ""}
              </span>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                {formatIDR(activeVariant.priceOTR)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block">
                DP Promo {formatIDR(activeVariant.dpPromo)}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={handleSimulationClick}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition border border-slate-300 cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5 text-[#E4002B]" />
          <span>Simulasi</span>
        </button>
        <button
          onClick={handleOpenWaModal}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat Sales</span>
        </button>
      </div>
    </div>
  );
}
