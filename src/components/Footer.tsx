import React from "react";
import { HondaLogo, MpmLogo } from "@/components/Logos";
import { DEALER_INFO } from "@/data/motorData";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Dealer Info */}
          <div className="space-y-3.5 md:col-span-2">
            <div className="flex items-center gap-3">
              <HondaLogo className="h-8 w-auto text-[#E4002B]" />
              <div className="h-5 w-px bg-slate-700"></div>
              <MpmLogo className="h-7 w-auto" dark={true} />
              <div className="border-l border-slate-700 pl-3">
                <span className="text-base font-black tracking-tight text-white uppercase block leading-none">
                  MPM Motor <span className="text-[#E4002B]">Blitar</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  {DEALER_INFO.subname}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Dealer Resmi Sepeda Motor Honda dan Bengkel AHASS melayani penjualan tunai, kredit, tukar tambah, serta servis berkala untuk wilayah Kota Blitar dan Kabupaten Blitar.
            </p>
            <p className="text-[11px] text-slate-400">
              {DEALER_INFO.address}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase text-white tracking-wider block">
              Menu Utama
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#katalog" className="hover:text-white transition">Katalog Motor Honda</a>
              </li>
              <li>
                <a href="#simulasi" className="hover:text-white transition">Kalkulator Cicilan</a>
              </li>
              <li>
                <a href="#ahass" className="hover:text-white transition">Booking Servis AHASS</a>
              </li>
              <li>
                <a href="#promo" className="hover:text-white transition">Program Promo Dealer</a>
              </li>
              <li>
                <a href="#lokasi" className="hover:text-white transition">Lokasi & Rute Showroom</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase text-white tracking-wider block">
              Lini Motor Resmi
            </span>
            <ul className="space-y-2 text-xs">
              <li>Honda BeAT & Scoopy</li>
              <li>Honda Vario 125 & Vario 160</li>
              <li>Honda Stylo 160 Retro</li>
              <li>Honda PCX 160 & ADV 160</li>
              <li>Honda CBR150R & CB150R</li>
              <li>Honda EM1 e: Motor Listrik</li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© 2026 MPM Motor Blitar. Hak Cipta Dilindungi.</p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <p>
              Develop by{" "}
              <a
                href="https://verellio.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-slate-300 hover:text-[#E4002B] transition-colors underline decoration-slate-600 hover:decoration-[#E4002B] underline-offset-2"
              >
                Verellio
              </a>
            </p>
            <span className="hidden sm:inline text-slate-700">•</span>
            <a
              href="/admin"
              className="text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
              title="Portal Admin Showroom"
            >
              <span>🔒 Portal Admin</span>
            </a>
          </div>
          <p className="text-center sm:text-right">
            Satu HATI. / One HEART. Jaringan Resmi MPM Distributor Jawa Timur.
          </p>
        </div>

      </div>
    </footer>
  );
}
