"use client";

import React, { useState } from "react";
import { MessageSquare, X, ChevronRight, Phone } from "@/components/Icons";
import { SALES_TEAM, DEALER_INFO } from "@/data/motorData";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";

export default function FloatingWhatsApp() {
  const { openWhatsAppModal } = useWhatsAppModal();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Pop-up Sales Selection Panel */}
      {open && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="bg-[#0F172A] text-white p-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black">Konsultan Sales & Servis</h4>
              <p className="text-[11px] text-slate-300">Pilih tim kami yang online untuk merespons:</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded transition"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
              Konsultan Penjualan Motor
            </span>

            {SALES_TEAM.map((sales) => (
              <button
                key={sales.id}
                type="button"
                onClick={() => {
                  setOpen(false);
                  openWhatsAppModal({ defaultSalesId: sales.id });
                }}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200 group text-left cursor-pointer"
              >
                <div className="relative shrink-0">
                  <img
                    src={sales.avatar}
                    alt={sales.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-[#E4002B] transition-colors">
                    {sales.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block truncate">{sales.role}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#E4002B] transition-colors" />
              </button>
            ))}

            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1">
                Layanan Bengkel AHASS
              </span>
              <a
                href={`https://wa.me/${DEALER_INFO.whatsappAhass}?text=Halo%20Admin%20AHASS%20MPM%20Motor%20Blitar,%20saya%20ingin%20tanya%20jadwal%20servis`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition border border-slate-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-red-100 text-[#E4002B] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-900 block truncate">
                    Admin Bengkel AHASS
                  </span>
                  <span className="text-[10px] text-slate-500 block">Konsultasi Sparepart & Servis</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#E4002B] transition-colors" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl transition-transform hover:scale-105 cursor-pointer"
        aria-label="Pilih Sales WhatsApp"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline font-bold">Chat Sales Blitar ({SALES_TEAM.length})</span>
      </button>
    </div>
  );
}
