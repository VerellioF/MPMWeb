"use client";

import React from "react";
import { MessageSquare, Phone, CheckCircle2 } from "@/components/Icons";
import { SALES_TEAM } from "@/data/motorData";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { useSiteData } from "@/context/SiteDataContext";

export default function SalesTeamSection() {
  const { openWhatsAppModal } = useWhatsAppModal();
  const { data } = useSiteData();
  const salesTeam = data?.salesTeam || SALES_TEAM;

  return (
    <section id="sales" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-[#E4002B] uppercase tracking-wider block">
            Konsultan Penjualan Resmi
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Hubungi Konsultan Sales MPM Motor Blitar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Dapatkan pendampingan ramah dan transparan mulai dari simulasi cicilan hemat, pengurusan berkas KTP se-Blitar Raya, penawaran diskon uang muka, hingga unit diantar langsung ke garasi rumah Anda.
          </p>
        </div>

        {/* Sales Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {salesTeam.map((sales) => (
            <div
              key={sales.id}
              className="rounded-2xl bg-slate-50 border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 transition shadow-xs hover:shadow-md"
            >
              <div className="space-y-4">
                {/* Avatar with Online Indicator */}
                <div className="relative w-20 h-20 mx-auto">
                  <img
                    src={sales.avatar}
                    alt={sales.name}
                    className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>

                <div className="text-center space-y-1">
                  <h3 className="text-base font-black text-slate-900">{sales.name}</h3>
                  <span className="text-xs font-bold text-[#E4002B] block">{sales.role}</span>
                  <p className="text-xs text-slate-500 pt-1 line-clamp-2">{sales.specialty}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center justify-center gap-1.5 font-semibold text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-[#E4002B]" />
                    <span>{sales.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Sales Resmi Terverifikasi</span>
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <button
                  type="button"
                  onClick={() => openWhatsAppModal({ defaultSalesId: sales.id })}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#E4002B] hover:bg-[#C50025] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Konsultasi Sales ({sales.name.split(" ")[0]})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
